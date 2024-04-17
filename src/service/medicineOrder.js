class MedicineOrderService {
    constructor(medicineOrderRepo) {
        this.medicineOrderRepo = medicineOrderRepo
    }

    async createMedicineOrder(medicineOrder) {
        try {
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