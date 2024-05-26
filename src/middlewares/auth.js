const Joi = require("joi");
const { ErrorResponse, ErrorType } = require("../models/response");
const { RESPONSE_STATUS_CODE } = require("../util/constants");

class AuthMiddleware {
    constructor() {}
    validateLoginParams(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
        })

        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_LOGIN, error.message)]
            return res.status(RESPONSE_STATUS_CODE.BAD_REQUEST).send(errs)
        }
        next();
    }
    validateRegisterParams(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().pattern(/^[a-z][a-z0-9]*$/).min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            address: Joi.string().optional(),
            phoneNumber: Joi.string().optional(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_USER_REGISTER, error.message)]
            return res.status(RESPONSE_STATUS_CODE.BAD_REQUEST).send(errs)
        }
        next()
    }
}

module.exports = { AuthMiddleware }