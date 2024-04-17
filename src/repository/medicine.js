const { DataTypes } = require("sequelize")
const { Medicine } = require("../model/medicine")
class MedicinePostgres {
    constructor(sequelize) {
        Medicine.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.FLOAT,
            stock: DataTypes.INTEGER,
            image: DataTypes.STRING,
            'deletedAt': DataTypes.DATE,
            'updatedAt': DataTypes.DATE,
        }, { sequelize, modelName: 'medicine', tableName: "medicines" })
    }

    async createMedicine(medicine) {
        try {
            await Medicine.create({
                name: medicine.name,
                description: medicine.description,
                price: medicine.price,
                stock: medicine.stock,
                image: medicine.image,
            })
        } catch (error) {
            throw error;
        }
    }

    async getMedicines() {
        try {
            const medicines = await Medicine.findAll({
                where: { deletedAt: null }
            })
            return medicines
        } catch (error) {
            throw error;
        }
    }

    async getMedicineById(medicineId) {
        try {
            const medicine = await Medicine.findOne({ where: { id: medicineId, deletedAt: null } })
            return medicine
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicinePostgres }