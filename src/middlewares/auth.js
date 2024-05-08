const Joi = require("joi");
const { ErrorResponse, ErrorMessage } = require("../models/response");

class AuthMiddleware {
    constructor() {}
    validateLoginParams(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
        })

        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_LOGIN)]
            return res.status(400).send(errs)
        }
        next();
    }
    validateRegisterParams(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            phoneNumber: Joi.string().optional(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_REGISTER)]
            return res.status(400).send(errs)
        }
        next()
    }
}

module.exports = { AuthMiddleware }