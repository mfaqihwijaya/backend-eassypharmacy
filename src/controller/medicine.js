const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");
const { RESPONSE_STATUS_CODE } = require("../util/constants");
class MedicineController {
    constructor(medicineService) {
        this.medicineService = medicineService
    }
    async getMedicines(req, res) {
        try {
            const query = req.query
            const paginatedMedicines = await this.medicineService.getMedicines(query)
            const response = new SuccessResponse(SuccessMessage.MEDICINE_FETCHED, paginatedMedicines)
            res.status(RESPONSE_STATUS_CODE.OK).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_FETCH, err.message)]
            res.status(err.status? err.status: RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).send(errs)
        }
    }

    async getMedicineById(req, res) {
        try {
            const { medicineId } = req.params
            const medicine = await this.medicineService.getMedicineById(medicineId)
            const response = new SuccessResponse(SuccessMessage.MEDICINE_FETCHED, medicine)
            res.status(RESPONSE_STATUS_CODE.OK).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_FETCH, err.message)]
            res.status(err.status? err.status: RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).send(errs)
        }
    }
}

module.exports = { MedicineController }