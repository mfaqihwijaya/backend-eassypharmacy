const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../model/response");
const { UserRequest } = require("../model/user");

class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async createUser(req, res) {
        let payload = req.body
        // TODO bcrypt password

        // call repository
        try {
            await this.userService.createUser(payload)
            const response = new SuccessResponse(SuccessMessage.USER_CREATED)
            res.status(201).send(response)
        } catch (error) {
            console.error(`error creating user ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_CREATION)]
            res.status(500).send(errs)
        }
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