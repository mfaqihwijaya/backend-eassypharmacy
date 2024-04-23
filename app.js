const express = require("express");
const config = require("./src/config/common.json");
const { UserPostgres } = require("./src/repositories/user")
const { MedicinePostgres } = require("./src/repositories/medicine")
const { UserRouter } = require("./src/router/user")
const { MedicineRouter } = require("./src/router/medicine");
const { UserService } = require("./src/service/user")
const { MedicineService } = require("./src/service/medicine")
const db = require("./src/models/db")
const { UserController } = require("./src/controller/user");
const { MedicineController } = require("./src/controller/medicine");
const { MedicineOrderPostgres } = require("./src/repositories/medicineOrder");
const { MedicineOrderService } = require("./src/service/medicineOrder");
const { MedicineOrderController } = require("./src/controller/medicineOrder");
const { MedicineOrderRouter } = require("./src/router/medicineOrder");
const { AuthService } = require("./src/service/auth");
const { AuthController } = require("./src/controller/auth");
const { AuthRouter } = require("./src/router/auth");


async function serveBackend() {
  const app = await prepare()

  // running server
  const server = app.listen(config.server.port, () => {
    console.log(`server is running on port ${config.server.port}`);
  });


  // events to shut down
  process.on("SIGTERM", expressGraceful(server, db.sequelize));
  process.on("SIGINT", expressGraceful(server, db.sequelize));
}

async function prepare() {
  // make express app
  const app = express();
  // middleware
  app.use(express.json());

  // class definitions
  const userRepo = new UserPostgres(db);

  const authService = new AuthService(userRepo, config.session);
  const authController = new AuthController(authService);

  const userService = new UserService(userRepo);
  const userController = new UserController(userService);

  const medicineRepo = new MedicinePostgres(db);
  const medicineService = new MedicineService(medicineRepo);
  const medicineController = new MedicineController(medicineService);

  const medicineOrderRepo = new MedicineOrderPostgres(db);
  const medicineOrderService = new MedicineOrderService(medicineOrderRepo);
  const medicineOrderController = new MedicineOrderController(medicineOrderService);

  // router
  const authRouter = new AuthRouter(app, authController);
  const userRouter = new UserRouter(app, userController);
  const medicineRouter = new MedicineRouter(app, medicineController);
  const medicineOrderRouter = new MedicineOrderRouter(app, medicineOrderController);

  // mount all 
  authRouter.mountV1();
  userRouter.mountV1();
  medicineRouter.mountV1();
  medicineOrderRouter.mountV1();

  return app;
}

function expressGraceful(server, dbConnection) {
  return async () => {
    console.log("server is shutting down");
    server.close();

    console.log("close database connection");
    await dbConnection.close()
  };
}

serveBackend();
