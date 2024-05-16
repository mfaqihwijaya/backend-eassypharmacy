const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");

class MedicineController {
    constructor(medicineService) {
        this.medicineService = medicineService
    }
    async getMedicines(req, res) {
        try {
            const query = req.query
            const medicines = await this.medicineService.getMedicines(query)
            const response = new SuccessResponse(SuccessMessage.MEDICINE_FETCHED, medicines)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }

    async getMedicineById(req, res) {
        const medicineId = req.params.medicineId
        try {
            const medicine = await this.medicineService.getMedicineById(medicineId)
            const response = new SuccessResponse(SuccessMessage.MEDICINE_FETCHED, medicine)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
}

module.exports = { MedicineController }