const { User } = require("../model/user")
const { DataTypes } = require("sequelize")

class UserPostgres {
    constructor(sequelize) {
        User.init({
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            'phoneNumber': DataTypes.STRING,
            password: DataTypes.STRING,
        }, { sequelize, modelName: 'user', tableName: "users" })
    }

    async createUser(user) {
        try {
            await User.create({
                username: user.username,
                email: user.email,
                'phoneNumber': user.phoneNumber,
                password: user.password,
            })
        } catch (error) {
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll({
                where: { deletedAt: null }
            })
            return users
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findOne({ where: { id: userId, deletedAt: null } })
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = { UserPostgres };