const { RESPONSE_STATUS_CODE } = require("../util/constants")

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
                error.status = RESPONSE_STATUS_CODE.NOT_FOUND
                throw error
            }
            const profile = {
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address
            }
            return profile
        } catch (err) {
            throw err
        }
    }
}

module.exports = { UserService }