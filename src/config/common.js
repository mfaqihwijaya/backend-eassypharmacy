require('dotenv').config();
module.exports = {
    "development": {
        "server": {
            "host": process.env.HOST_DEV,
            "port": process.env.PORT_DEV
        }
    },
    "test": {
        "server": {
            "host": process.env.HOST_TEST,
            "port": process.env.PORT_TEST
        }
    },
    "production": {
        "server": {
            "host": process.env.HOST_PROD,
            "port": process.env.PORT_PROD
        }
    }
}