class MedicineOrderRouter {
    constructor(app, jwtMiddleware, medicineOrderMiddleware, medicineOrderController) {
        this.medicineOrderController = medicineOrderController
        this.app = app
        this.jwtMiddleware = jwtMiddleware
        this.medicineOrderMiddleware = medicineOrderMiddleware
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [POST, GET] /api/v1/medicine-orders 
        const medicineOrders = this.app.route(`${v1}/medicine-orders`)
        medicineOrders.post(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res, next) => {
                this.medicineOrderMiddleware.validateCreateMedicineOrderParams(req, res, next)
            },
            async (req, res) => {
                this.medicineOrderController.createMedicineOrder(req, res)
            }
        )
        medicineOrders.get(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.medicineOrderController.getMedicineOrders(req, res)
            }
        )

        const medicineOrdersMedicine = this.app.route(`${v1}/medicine-orders/medicines/:medicineId`)
        medicineOrdersMedicine.get(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.medicineOrderController.checkMedicineInCart(req, res)
            }
        )

        // [GET] /api/v1/medicine-orders/:medicineOrderId
        const medicineOrderId = this.app.route(`${v1}/medicine-orders/:medicineOrderId`)
        medicineOrderId.get(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.medicineOrderController.getMedicineOrderById(req, res)
            }
        )
        medicineOrderId.put(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.medicineOrderController.updateMedicineOrderQuantity(req, res)
            }
        )
        medicineOrderId.delete(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.medicineOrderController.deleteMedicineOrder(req, res)
            }
        )
    }
}

module.exports = { MedicineOrderRouter }