class UserPostgres {
    constructor(db) {
        this.User = db.User;
    }

    async createUser(user, transaction = null) {
        await this.User.create(user, { transaction });
    }

    async getUserById(userId, transaction = null) {
        const user = await this.User.findOne({
            where: { id: userId, deletedAt: null },
            transaction,
        });
        return user;
    }

    async getUserByEmail(email, transaction = null) {
        const user = await this.User.findOne({
            where: { email: email, deletedAt: null },
            transaction,
        });
        return user;
    }
    async getUserByUsername(username, transaction = null) {
        const user = await this.User.findOne({
            where: { username: username, deletedAt: null },
            transaction,
        });
        return user;
    }
}

module.exports = { UserPostgres };
