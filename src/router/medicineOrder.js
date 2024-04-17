class MedicineOrderRouter {
    constructor(app, medicineOrderController) {
        this.medicineOrderController = medicineOrderController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET, POST] /api/v1/medicine-orders 
        const medicineOrders = this.app.route(`${v1}/medicine-orders`)
        medicineOrders.get(async (req, res) => {
            this.medicineOrderController.getMedicineOrders(req, res)
        })
        medicineOrders.post(async (req, res) => {
            this.medicineOrderController.createMedicineOrder(req, res)
        })

        // [GET] /api/v1/medicine-orders/:medicineOrderId
        const medicineOrderId = this.app.route(`${v1}/medicine-orders/:medicineOrderId`)
        medicineOrderId.get(async (req, res) => {
            this.medicineOrderController.getMedicineOrderById(req, res)
        })

    }
}

module.exports = { MedicineOrderRouter }