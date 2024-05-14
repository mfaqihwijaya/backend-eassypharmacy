const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");

class AuthController {
    constructor(authService) {
        this.authService = authService
    }
    async userRegister(req, res) {
        let payload = req.body
        try {
            const user = await this.authService.userRegister(payload)
            const response = new SuccessResponse(SuccessMessage.USER_REGISTERED, user)
            res.status(201).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_REGISTER, err.message)]
            res.status(err.status).send(errs)
        }
    }

    async userLogin(req, res) {
        // get user email and passwordk
        const payload = req.body
        // do login logic
        try {
            const token = await this.authService.userLogin(payload)
            const response = new SuccessResponse(SuccessMessage.USER_LOGGED_IN, token)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_LOGIN, err.message)]
            res.status(err.status).send(errs)
        }
    }
}

module.exports = { AuthController }