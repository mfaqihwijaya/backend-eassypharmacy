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