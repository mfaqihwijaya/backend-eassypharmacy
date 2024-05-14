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
        } catch (err) {
            const error = new Error(err.message);
            error.status = 500;
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
        } catch (err) {
            const error = new Error(err.message);
            error.status = 500;
            throw error
        }
    }

    async updateMedicine(medicine, transaction = null) {
        try {
            await this.Medicine.update(medicine, {
                 where: { id: medicine.id },
                 transaction
            })
        } catch (err) {
            const error = new Error(err.message);
            error.status = 500;
            throw error
        }
    }
}

module.exports = { MedicinePostgres }