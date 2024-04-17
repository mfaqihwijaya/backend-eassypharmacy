const express = require("express");
const config = require("./config/local.json");
const { UserPostgres } = require("./src/repository/user")
const { MedicinePostgres } = require("./src/repository/medicine")
const { UserRouter } = require("./src/router/user")
const { MedicineRouter } = require("./src/router/medicine");
const { UserService } = require("./src/service/user")
const { MedicineService } = require("./src/service/medicine")
const { connectDb } = require("./src/config/db")
const { UserController } = require("./src/controller/user");
const { MedicineController } = require("./src/controller/medicine");


async function serveBackend() {
  const { app, dbMaster } = await prepare()

  // running server
  const server = app.listen(config.server.port, () => {
    console.log(`server is running on port ${config.server.port}`);
  });


  // events to shut down
  process.on("SIGTERM", expressGraceful(server, dbMaster));
  process.on("SIGINT", expressGraceful(server, dbMaster));
}

async function prepare() {
  // make db connection
  const { postgres } = config
  const dbMaster = await connectDb(postgres.master)
  // make express app
  const app = express();
  // middleware
  app.use(express.json());

  // class definitions
  const userRepo = new UserPostgres(dbMaster);
  const medicineRepo = new MedicinePostgres(dbMaster)
  const userService = new UserService(userRepo);
  const medicineService = new MedicineService(medicineRepo);
  const userController = new UserController(userService)
  const medicineController = new MedicineController(medicineService);
  // router
  const userRouter = new UserRouter(app, userController)
  const medicineRouter = new MedicineRouter(app, medicineController)

  // mount all 
  userRouter.mountV1()
  medicineRouter.mountV1()
  
  return { app, dbMaster }
}

function expressGraceful(server, dbMaster) {
  return async () => {
    console.log("server is shutting down");
    server.close();

    console.log("close database connection");
    await dbMaster.close()
  };
}

serveBackend();
