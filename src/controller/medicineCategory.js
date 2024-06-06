const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");
const { RESPONSE_STATUS_CODE } = require("../util/constants");

class MedicineCategoryController {
    constructor(medicineCategoryService) {
        this.medicineCategoryService = medicineCategoryService
    }
    async getCategories(req, res) {
        try {
            const categories = await this.medicineCategoryService.getCategories()
            const response = new SuccessResponse(SuccessMessage.CATEGORY_FETCHED, categories)
            res.status(RESPONSE_STATUS_CODE.OK).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_CATEGORY_FETCH, err.message)]
            res.status(RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).send(errs)
        }
    }
}

module.exports = { MedicineCategoryController }