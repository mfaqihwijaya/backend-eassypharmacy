const { validateJWT } = require('../middlewares/jwt')
class MedicineOrderRouter {
    constructor(app, medicineOrderController) {
        this.medicineOrderController = medicineOrderController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [POST] /api/v1/medicine-orders 
        const medicineOrders = this.app.route(`${v1}/medicine-orders`)
        medicineOrders.post(validateJWT, async (req, res) => {
            this.medicineOrderController.createMedicineOrder(req, res)
        })

        // [GET] /api/v1/medicine-orders/:medicineOrderId
        const medicineOrderId = this.app.route(`${v1}/medicine-orders/:medicineOrderId`)
        medicineOrderId.get(validateJWT, async (req, res) => {
            this.medicineOrderController.getMedicineOrderById(req, res)
        })

    }
}

module.exports = { MedicineOrderRouter }