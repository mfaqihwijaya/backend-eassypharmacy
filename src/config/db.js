const { Sequelize } = require("sequelize")

async function connectDb(config) {
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`, { logging: false })
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log(error)
        throw new Error()
    }
    return sequelize
}

module.exports = { connectDb }