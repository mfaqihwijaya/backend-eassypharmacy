const { Sequelize } = require("../models/db")
const { ErrorMessage } = require("../models/response")
const { RESPONSE_STATUS_CODE } = require("../util/constants")

class MedicineService {
    constructor(medicineRepo) {
        this.medicineRepo = medicineRepo
    }

    async getMedicines(query) {
        try {
            const { keyword = '', count = 8, page = 1, column = 'name', orderType = 'ASC', categoryId = null } = query
            const whereSearch = {
                name: {
                    [Sequelize.Op.iLike]: `%${keyword}%`
                },
            }
            if (categoryId) {
                whereSearch.categoryId = categoryId
            }
            const limit = count
            const offset = count * (page - 1)
            const order = [[column, orderType]]
            const medicines = await this.medicineRepo.getMedicines(whereSearch, limit, offset, order);  
            // remove unnecessary field
            const returnMedicines = medicines.map(medicine => {
                const { createdAt, updatedAt, deletedAt, ...rest } = medicine.dataValues
                return rest
            })
            const countData = await this.medicineRepo.countMedicines(whereSearch)
            const paginatedData = {
                medicines: returnMedicines,
                pagination: {
                    totalData: countData,
                    currentPage: page,
                    totalPage: Math.ceil(countData / count),
                }
            }
            return paginatedData;
        } catch (err) {
            throw err;
        }
    }

    async getMedicineById(medicineId) {
        try {
            const medicine = await this.medicineRepo.getMedicineById(medicineId);
            if (!medicine) {
                const error = new Error(ErrorMessage.ERROR_MEDICINE_NOT_FOUND)
                error.status = RESPONSE_STATUS_CODE.NOT_FOUND
                throw error
            }
            return medicine
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicineService }