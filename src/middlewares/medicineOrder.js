const Joi = require("joi");
const { ErrorResponse, ErrorType } = require("../models/response");

class MedicineOrderMiddleware {
    async validateCreateMedicineOrderParams(req, res, next) {
        const schema = Joi.object({
            userId: Joi.number().required(),
            medicineId: Joi.number().required(),
            count: Joi.number().min(1).required(),
        })
        const { error } = schema.validate(req.body);
        if (error) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_ORDER_CREATION, error.message)]
            return res.status(400).send(errs)
        }
        next();
    }
}

module.exports = { MedicineOrderMiddleware }