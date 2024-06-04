const {
    SuccessMessage,
    ErrorResponse,
    ErrorMessage,
    SuccessResponse,
    ErrorType,
} = require('../models/response');
const { RESPONSE_STATUS_CODE } = require('../util/constants');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(req, res) {
        try {
            const { userId } = req;
            const user = await this.userService.getProfile(userId);
            const response = new SuccessResponse(
                SuccessMessage.USER_FETCHED,
                user
            );
            res.status(RESPONSE_STATUS_CODE.OK).send(response);
        } catch (err) {
            const errs = [
                new ErrorResponse(ErrorType.ERROR_USER_FETCH, err.message),
            ];
            res.status(
                err.status
                    ? err.status
                    : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            ).send(errs);
        }
    }
}

module.exports = { UserController };
