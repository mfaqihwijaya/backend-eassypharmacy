class MedicinePostgres {
    constructor(db) {
        this.Medicine = db.Medicine
    }

    async getMedicines(whereSearch, limit, offset, order) {
        try {
            const medicines = await this.Medicine.findAll({
                where: { ...whereSearch, deletedAt: null },
                limit,
                offset,
                order
            })
            return medicines
        } catch (error) {
            throw error;
        }
    }

    async getMedicineById(medicineId, transaction = null) {
        try {
            const medicine = await this.Medicine.findOne({ 
                where: { id: medicineId, deletedAt: null },
                transaction
            })
            return medicine
        } catch (error) {
            throw error
        }
    }

    async updateMedicine(medicine, transaction = null) {
        try {
            await this.Medicine.update(medicine, {
                 where: { id: medicine.id },
                 transaction
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicinePostgres }