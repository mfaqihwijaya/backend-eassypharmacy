class MedicineService {
    constructor(medicineRepo) {
        this.medicineRepo = medicineRepo
    }

    async createMedicine(medicine) {
        try {
            await this.medicineRepo.createMedicine(medicine);
        } catch (error) {
            throw error;
        }
    }

    async getMedicines() {
        try {
            const medicines = await this.medicineRepo.getMedicines();
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