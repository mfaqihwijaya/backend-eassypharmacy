class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo
    }

    async createUser(user) {
        try {
            await this.userRepo.createUser(user)
        } catch (err) {
            throw err
        }
    }

    async getProfile(userId) {
        try {
            const user = await this.userRepo.getProfile(userId)
            if (!user) {
                const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND)
                error.status = 404
                throw error
            }
            return user
        } catch (err) {
            throw err
        }
    }
}

module.exports = { UserService }