class MedicineRouter {
    constructor(app, medicineController) {
        this.medicineController = medicineController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET] /api/v1/medicines 
        const medicines = this.app.route(`${v1}/medicines`)
        medicines.get(async (req, res) => {
            this.medicineController.getMedicines(req, res)
        })

        // [GET] /api/v1/medicines/:medicineId
        const medicineId = this.app.route(`${v1}/medicines/:medicineId`)
        medicineId.get(async (req, res) => {
            this.medicineController.getMedicineById(req, res)
        })

    }
}

module.exports = { MedicineRouter }