const { Sequelize } = require("../models/db")

class MedicineService {
    constructor(medicineRepo) {
        this.medicineRepo = medicineRepo
    }

    async getMedicines(query) {
        try {
            const { keyword = '', count = 10, page = 1, column = 'name' } = query
            const whereSearch = {
                name: {
                    [Sequelize.Op.iLike]: `%${keyword}%`
                }
            }
            const limit = count
            const offset = count * (page - 1)
            const order = [[column, 'ASC']]
            const medicines = await this.medicineRepo.getMedicines(whereSearch, limit, offset, order);
            return medicines;
        } catch (err) {
            const error = new Error(err.message)
            error.status = 500;
            throw error;
        }
    }

    async getMedicineById(medicineId) {
        try {
            const medicine = await this.medicineRepo.getMedicineById(medicineId);
            return medicine
        } catch (err) {
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
}

module.exports = { MedicineService }