class MedicineCategoryRouter {
    constructor(app, medicineCategoryController) {
        this.medicineCategoryController = medicineCategoryController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET] /api/v1/categories 
        const categories = this.app.route(`${v1}/categories`)
        categories.get(async (req, res) => {
            this.medicineCategoryController.getCategories(req, res)
        })
    }
}

module.exports = { MedicineCategoryRouter }