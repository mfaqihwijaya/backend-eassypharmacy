class UserPostgres {
    constructor(db) {
        this.User = db.User;
    }

    async createUser(user, transaction = null) {
        try {
            await this.User.create(user, { transaction });
        } catch (err) {
            throw err;
        }
    }

    async getUserById(userId, transaction = null) {
        try {
            const user = await this.User.findOne({
                where: { id: userId, deletedAt: null },
                transaction,
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async getUserByEmail(email, transaction = null) {
        try {
            const user = await this.User.findOne({
                where: { email: email, deletedAt: null },
                transaction,
            });
            return user;
        } catch (err) {
            throw err;
        }
    }
    async getUserByUsername(username, transaction = null) {
        try {
            const user = await this.User.findOne({
                where: { username: username, deletedAt: null },
                transaction,
            });
            return user;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { UserPostgres };
