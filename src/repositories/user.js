class UserPostgres {
    constructor(db) {
        this.User = db.User;
    }

    async createUser(user) {
        try {
            await this.User.create({
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: user.password,
            })
        } catch (err) {
            throw err;
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.User.findOne({ where: { id: userId, deletedAt: null } })
            return user
        } catch (err) {
            throw err
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.User.findOne({ where: { email: email, deletedAt: null } })
            return user
        } catch (err) {
            throw err
        }
    }
    async getUserByUsername(username) {
        try {
            const user = await this.User.findOne({ where: { username: username, deletedAt: null } })
            return user
        } catch (err) {
            throw err
        }
    }
}

module.exports = { UserPostgres };