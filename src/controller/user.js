const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../models/response");

class UserController {
    constructor(userService) {
        this.userService = userService
    }
    async getUserById(req, res) {
        const userId = req.params.userId

        try {
            const user = await this.userService.getUserById(userId)
            if (!user) {
                const errs = [new ErrorResponse(ErrorMessage.ERROR_USER_NOT_FOUND, ErrorMessage.ERROR_USER_FETCH)]
                res.status(404).send(errs)
                return
            }
            const response = new SuccessResponse(SuccessMessage.USER_FETCHED, user)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching user ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_FETCH)]
            res.status(500).send(errs)
        }
    }
}

module.exports = { UserController }