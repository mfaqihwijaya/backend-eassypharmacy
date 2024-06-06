const { RESPONSE_STATUS_CODE } = require('../util/constants');

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async createUser(user) {
        await this.userRepo.createUser(user);
    }

    async getProfile(userId) {
        const user = await this.userRepo.getUserById(userId);
        const profile = {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        };
        return profile;
    }
}

module.exports = { UserService };
