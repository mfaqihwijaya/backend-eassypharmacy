class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo
    }

    async createUser(user) {
        try {
            await this.userRepo.createUser(user)
        } catch (error) {
            throw error
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.userRepo.getUserById(userId)
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = { UserService }