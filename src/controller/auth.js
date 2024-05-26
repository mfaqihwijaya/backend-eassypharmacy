const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");
const { RESPONSE_STATUS_CODE } = require("../util/constants");

class AuthController {
    constructor(authService) {
        this.authService = authService
    }
    async userRegister(req, res) {
        try {
            let payload = req.body
            const user = await this.authService.userRegister(payload)
            const response = new SuccessResponse(SuccessMessage.USER_REGISTERED, user)
            res.status(RESPONSE_STATUS_CODE.CREATED).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_REGISTER, err.message)]
            res.status(err.status? err.status: RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).send(errs)
        }
    }

    async userLogin(req, res) {
        try {
            const payload = req.body
            const token = await this.authService.userLogin(payload)
            const response = new SuccessResponse(SuccessMessage.USER_LOGGED_IN, token)
            res.status(RESPONSE_STATUS_CODE.OK).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_LOGIN, err.message)]
            res.status(err.status? err.status: RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).send(errs)
        }
    }
}

module.exports = { AuthController }