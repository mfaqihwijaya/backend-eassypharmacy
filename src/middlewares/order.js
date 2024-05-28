const Joi = require("joi");
const { ErrorResponse, ErrorType } = require("../models/response");
const { RESPONSE_STATUS_CODE } = require("../util/constants");

class OrderMiddleware {
    async validateCheckoutParams(req, res, next) {
        const schema = Joi.object({
            medicineOrderIds: Joi.array().items(
                Joi.number().min(1).required()
            ).min(1).required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_ORDER_CHECKOUT, error.message)]
            return res.status(RESPONSE_STATUS_CODE.BAD_REQUEST).send(errs)
        }
        next();
    }
    async validateUpdateAddressParams(req, res, next) {
        const schema = Joi.object({
            address: Joi.string().trim().min(1).required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_ORDER_UPDATE, error.message)];
            return res.status(RESPONSE_STATUS_CODE.BAD_REQUEST).send(errs);
        }
        next();
    }
}

module.exports = { OrderMiddleware }