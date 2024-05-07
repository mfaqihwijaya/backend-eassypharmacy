'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('MedicineOrders', [
      {
        userId: 1,
        medicineId: 1,
        count: 2,
        subTotal: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        medicineId: 2,
        count: 3,
        subTotal: 24000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        medicineId: 3,
        count: 4,
        subTotal: 28000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
