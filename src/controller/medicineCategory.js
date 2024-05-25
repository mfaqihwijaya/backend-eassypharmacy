const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");

class MedicineCategoryController {
    constructor(medicineCategoryService) {
        this.medicineCategoryService = medicineCategoryService
    }
    async getCategories(req, res) {
        try {
            const categories = await this.medicineCategoryService.getCategories()
            const response = new SuccessResponse(SuccessMessage.CATEGORY_FETCHED, categories)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_CATEGORY_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
}

module.exports = { MedicineCategoryController }