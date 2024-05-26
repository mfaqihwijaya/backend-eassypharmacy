class MedicineCategoryPostgres {
    constructor(db) {
        this.MedicineCategory = db.MedicineCategory;
    }

    async getCategories(transaction = null) {
        try {
            const categories = await this.MedicineCategory.findAll({ 
                where: { deletedAt: null }, 
                attributes: ['id', 'name'],
                transaction
            })
            return categories
        } catch (err) {
            throw err
        }
    }
}

module.exports = { MedicineCategoryPostgres };