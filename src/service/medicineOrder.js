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
            const medicine = await this.medicineRepo.getMedicineById(medicineId);
            if (!medicine) {
                throw new Error(ErrorMessage.ERROR_MEDICINE_NOT_FOUND);
            }
            const subTotal = count * medicine.price;
            medicineOrder.subTotal = subTotal;
            await this.medicineOrderRepo.createMedicineOrder(medicineOrder);
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