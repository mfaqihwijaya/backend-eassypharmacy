const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../model/response");

class MedicineOrderController {
    constructor(medicineOrderService) {
        this.medicineOrderService = medicineOrderService
    }

    async createMedicineOrder(req, res) {
        let payload = req.body
        // call repository
        try {
            await this.medicineOrderService.createMedicineOrder(payload)
            const response = new SuccessResponse(SuccessMessage.MEDICINE_ORDER_CREATED)
            res.status(201).send(response)
        } catch (error) {
            console.error(`error creating medicine order ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_MEDICINE_ORDER_CREATION)]
            res.status(500).send(errs)
        }
    }

    async getMedicineOrderById(req, res) {
        const medicineOrderId = req.params.medicineOrderId
        try {
            const medicineOrder = await this.medicineOrderService.getMedicineOrderById(medicineOrderId)
            if (!medicineOrder) {
                const errs = [new ErrorResponse(ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND, ErrorMessage.ERROR_MEDICINE_ORDER_FETCH)]
                res.status(404).send(errs)
                return
            }
            const response = new SuccessResponse(SuccessMessage.MEDICINE_ORDER_FETCHED, medicineOrder)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching medicine order ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_MEDICINE_ORDER_FETCH)]
            res.status(500).send(errs)
        }
    }
}

module.exports = { MedicineOrderController }