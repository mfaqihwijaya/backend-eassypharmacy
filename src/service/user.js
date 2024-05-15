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
            const user = await this.userRepo.getUserById(userId)
            if (!user) {
                const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND)
                error.status = 404
                throw error
            }
            const profile = {
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }
            return profile
        } catch (err) {
            throw err
        }
    }
}

module.exports = { UserService }