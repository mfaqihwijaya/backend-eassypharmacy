const { ErrorResponse, ErrorMessage, ErrorType } = require('../models/response');
const { RESPONSE_STATUS_CODE } = require('../util/constants');

class JWTMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    async authenticate(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                const error = new Error(ErrorMessage.ERROR_REQUIRED_ACCESS_TOKEN);
                error.status = RESPONSE_STATUS_CODE.UNAUTHORIZED;
                throw error;
            }
            const decoded = await this.authService.validateUserToken(token);
            req.userId = decoded.sub;
            next();
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_AUTHENTICATION, err.message)]
            return res.status(err.status ? err.status : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).send(errs);
        }
    }
}

module.exports = { JWTMiddleware }
