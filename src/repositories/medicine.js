class MedicinePostgres {
    constructor(db) {
        this.Medicine = db.Medicine
    }

    async countMedicines() {
        try {
            const count = await this.Medicine.count({ where: { deletedAt: null } })
            return count
        } catch (err) {
            throw err;
        }
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
            throw err;
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
            throw err;
        }
    }

    async updateMedicine(medicine, transaction = null) {
        try {
            await this.Medicine.update(medicine, {
                 where: { id: medicine.id },
                 transaction
            })
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicinePostgres }