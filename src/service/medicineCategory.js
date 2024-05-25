class MedicineCategoryService {
    constructor(medicineCategoryRepo) {
        this.medicineCategoryRepo = medicineCategoryRepo
    }

    async getCategories() {
        try {
            const categories = await this.medicineCategoryRepo.getCategories();
            return categories;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicineCategoryService }