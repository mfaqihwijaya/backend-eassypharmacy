class MedicinePostgres {
    constructor(db) {
        this.Medicine = db.Medicine
        this.MedicineCategory = db.MedicineCategory
    }

    async countMedicines(whereSearch) {
        const count = await this.Medicine.count({ where: { ...whereSearch, deletedAt: null } })
        return count
    }

    async getMedicines(whereSearch, limit, offset, order) {
        const medicines = await this.Medicine.findAll({
            where: { ...whereSearch, deletedAt: null },
            attributes: { exclude: ['createdAt','updatedAt','deletedAt','categoryId'] },
            limit,
            offset,
            order,
            include: [
                {
                    model: this.MedicineCategory,
                    attributes: ['id', 'name']
                }
            ]
        })
        return medicines
    }

    async getMedicineById(medicineId, transaction = null) {
        const medicine = await this.Medicine.findOne({ 
            where: { id: medicineId, deletedAt: null },
            include: [
                {
                    model: this.MedicineCategory,
                    attributes: ['id', 'name']
                }
            ],
            transaction
        })
        return medicine
    }

    async updateMedicine(medicine, transaction) {
        await this.Medicine.update(medicine, {
                where: { id: medicine.id },
                transaction
        })
    }
}

module.exports = { MedicinePostgres }