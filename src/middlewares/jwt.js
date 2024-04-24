const jwt = require('jsonwebtoken');
const config = require('../config/common');
const { ErrorResponse, ErrorMessage } = require('../models/response');
async function validateJWT(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error(ErrorMessage.ERROR_REQUIRED_ACCESS_TOKEN);
        }
        // TODO need to change secret to env
        const decoded = jwt.verify(token, config.session.secret);
        const { sub } = decoded;
        req.userId = sub;
        next();
    } catch (err) {
        const errs = [new ErrorResponse(err.message, ErrorMessage.ERROR_USER_AUTHORIZATION)]
        return res.status(401).send(errs);
    }
}

module.exports = { validateJWT }
