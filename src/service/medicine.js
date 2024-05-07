class MedicineService {
    constructor(medicineRepo) {
        this.medicineRepo = medicineRepo
    }

    async getMedicines(query) {
        try {
            const { count = 2, page = 1, column = 'name' } = query
            const limit = count
            const offset = count * (page - 1)
            const order = [[column, 'ASC']]
            const medicines = await this.medicineRepo.getMedicines(limit, offset, order);
            return medicines;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineById(medicineId) {
        try {
            const medicine = await this.medicineRepo.getMedicineById(medicineId);
            return medicine
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicineService }