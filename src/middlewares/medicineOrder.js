const Joi = require("joi");
const { ErrorResponse, ErrorType } = require("../models/response");
const { RESPONSE_STATUS_CODE } = require("../util/constants");

class MedicineOrderMiddleware {
    async validateCreateMedicineOrderParams(req, res, next) {
        const schema = Joi.object({
            medicineId: Joi.number().required(),
            count: Joi.number().min(1).required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_ORDER_CREATION, error.message)]
            return res.status(RESPONSE_STATUS_CODE.BAD_REQUEST).send(errs)
        }
        next();
    }

    async validateUpdateMedicineOrderParams(req, res, next) {
        const schema = Joi.object({
            quantity: Joi.number().min(1).required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_ORDER_UPDATE, error.message)];
            return res.status(RESPONSE_STATUS_CODE.BAD_REQUEST).send(errs);
        }
        next();
    }
}

module.exports = { MedicineOrderMiddleware }