const { sequelize } = require("../models/db");
const { ErrorMessage } = require("../models/response");

class MedicineOrderService {
    constructor(medicineOrderRepo, medicineRepo, userRepo) {
        this.medicineOrderRepo = medicineOrderRepo
        this.medicineRepo = medicineRepo
        this.userRepo = userRepo
    }

    async createMedicineOrder(medicineOrder) {
        try {
            const { userId, medicineId, count } = medicineOrder;
            const user = await this.userRepo.getUserById(userId);
            if (!user) {
                throw new Error(ErrorMessage.ERROR_USER_NOT_FOUND);
            }
            const result = await sequelize.transaction(async (t) => {
                const medicine = await this.medicineRepo.getMedicineById(medicineId, t);
                if (!medicine) {
                    throw new Error(ErrorMessage.ERROR_MEDICINE_NOT_FOUND);
                }
                if(count > medicine.stock) {   
                    throw new Error(ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH);
                }
                // create order
                const subTotal = count * medicine.price;
                const newMedicineOrder = {
                    ...medicineOrder,
                    subTotal
                }
                await this.medicineOrderRepo.createMedicineOrder(newMedicineOrder, t);
                // update stock
                const medicineUpdate = {
                    id: medicine.id,
                    stock: medicine.stock - count
                }
                await this.medicineRepo.updateMedicine(medicineUpdate, t)
                return newMedicineOrder;
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrders() {
        try {
            const medicineOrders = await this.medicineOrderRepo.getMedicineOrders();
            return medicineOrders;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrderById(medicineOrderId) {
        try {
            const medicineOrder = await this.medicineOrderRepo.getMedicineOrderById(medicineOrderId);
            return medicineOrder
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicineOrderService }