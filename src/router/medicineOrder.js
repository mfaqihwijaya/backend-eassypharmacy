class MedicineOrderRouter {
    constructor(app, authMiddleware, medicineOrderController) {
        this.medicineOrderController = medicineOrderController
        this.authMiddleware = authMiddleware
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [POST] /api/v1/medicine-orders 
        const medicineOrders = this.app.route(`${v1}/medicine-orders`)
        medicineOrders.post(
        async (req, res, next) => {
            this.authMiddleware.authenticate(req, res, next)
        }, 
        async (req, res) => {
            this.medicineOrderController.createMedicineOrder(req, res)
        })

        // [GET] /api/v1/medicine-orders/:medicineOrderId
        const medicineOrderId = this.app.route(`${v1}/medicine-orders/:medicineOrderId`)
        medicineOrderId.get(
        async (req, res, next) => {
            this.authMiddleware.authenticate(req, res, next)
        },
        async (req, res) => {
            this.medicineOrderController.getMedicineOrderById(req, res)
        })

    }
}

module.exports = { MedicineOrderRouter }