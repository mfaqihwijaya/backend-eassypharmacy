const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../model/response");

class MedicineController {
    constructor(medicineService) {
        this.medicineService = medicineService
    }

    async createMedicine(req, res) {
        let payload = req.body
        // call repository
        try {
            await this.medicineService.createMedicine(payload)
            const response = new SuccessResponse(SuccessMessage.MEDICINE_CREATED)
            res.status(201).send(response)
        } catch (error) {
            console.error(`error creating medicine ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_MEDICINE_CREATION)]
            res.status(500).send(errs)
        }
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
        if (medicineId <= 0) {
            const errs = [new ErrorResponse(ErrorMessage.ERROR_INVALID_MEDICINE_ID, ErrorMessage.ERROR_MEDICINE_FETCH)]
            res.status(400).send(errs)
            return
        }

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