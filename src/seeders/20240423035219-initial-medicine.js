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
   await queryInterface.bulkInsert('Medicines', [
     {
       name: "Paracetamol",
       description: "This is medicine description",
       price: 10000,
       stock: 5,
       image: "",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Anti Depresant",
       description: "This is medicine description",
       price: 8000,
       stock: 15,
       image: "",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Aspirin",
       description: "This is medicine description",
       price: 7000,
       stock: 40,
       image: "",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Vitamin C",
       description: "This is medicine description",
       price: 15000,
       stock: 30,
       image: "",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Betadine",
       description: "This is medicine description",
       price: 7000,
       stock: 20,
       image: "",
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
    await queryInterface.bulkDelete('Medicines', {
      name: {
        [Sequelize.Op.in]: ['Paracetamol', 'Anti Depresant', 'Aspirin', 'Vitamin C', 'Betadine']
      }
    }, {});
  }
};
