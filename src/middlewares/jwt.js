const { ErrorResponse, ErrorMessage, ErrorType } = require('../models/response');

class JWTMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    async authenticate(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                const error = new Error(ErrorMessage.ERROR_REQUIRED_ACCESS_TOKEN);
                error.status = 403;
                throw error;
            }
            // TODO need to change secret to env
            const decoded = await this.authService.validateUserToken(token);
            req.userId = decoded.sub;
            next();
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_AUTHENTICATION, err.message)]
            return res.status(err.status).send(errs);
        }
    }
}

module.exports = { JWTMiddleware }
