const jwt = require('jsonwebtoken');
const config = require('../config/common');
const { ErrorResponse, ErrorMessage, ErrorType } = require('../models/response');

class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    async authenticate(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error(ErrorMessage.ERROR_REQUIRED_ACCESS_TOKEN);
            }
            // TODO need to change secret to env
            const decoded = this.authService.validateUserToken(token);
            req.userId = decoded.sub;
            next();
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_AUTHENTICATION, err.message)]
            return res.status(403).send(errs);
        }
    }
}

module.exports = { AuthMiddleware }
