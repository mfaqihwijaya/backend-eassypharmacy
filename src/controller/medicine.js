const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../model/response");

class MedicineController {
    constructor(medicineService) {
        this.medicineService = medicineService
    }
    async getMedicines(req, res) {
        try {
            const medicines = await this.medicineService.getMedicines()
            const response = new SuccessResponse(SuccessMessage.MEDICINE_FETCHED, medicines)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching medicine ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_MEDICINE_FETCH)]
            res.status(500).send(errs)
        }
    }

    async getMedicineById(req, res) {
        const medicineId = req.params.medicineId
        try {
            const medicine = await this.medicineService.getMedicineById(medicineId)
            if (!medicine) {
                const errs = [new ErrorResponse(ErrorMessage.ERROR_MEDICINE_NOT_FOUND, ErrorMessage.ERROR_MEDICINE_FETCH)]
                res.status(404).send(errs)
                return
            }
            const response = new SuccessResponse(SuccessMessage.MEDICINE_FETCHED, medicine)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching medicine ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_MEDICINE_FETCH)]
            res.status(500).send(errs)
        }
    }
}

module.exports = { MedicineController }