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

    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Antibiotik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suplemen',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pencegah Infeksi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alergi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Penurun Panas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peradangan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Penyakit Dalam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Obat Batuk',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hormonal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Daya Tahan Tubuh',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
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
