class MedicinePostgres {
    constructor(db) {
        this.Medicine = db.Medicine
    }

    async getMedicines() {
        try {
            const medicines = await this.Medicine.findAll({
                where: { deletedAt: null }
            })
            return medicines
        } catch (error) {
            throw error;
        }
    }

    async getMedicineById(medicineId) {
        try {
            const medicine = await this.Medicine.findOne({ where: { id: medicineId, deletedAt: null } })
            return medicine
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicinePostgres }