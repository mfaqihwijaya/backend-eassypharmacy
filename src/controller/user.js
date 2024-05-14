const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");

class UserController {
    constructor(userService) {
        this.userService = userService
    }
    async getProfile(req, res) {
        try {
            const { userId } = req
            const user = await this.userService.getProfile(userId)
            const response = new SuccessResponse(SuccessMessage.USER_FETCHED, user)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
}

module.exports = { UserController }