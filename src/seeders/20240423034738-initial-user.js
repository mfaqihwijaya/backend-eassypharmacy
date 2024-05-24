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
    await queryInterface.bulkInsert('Users', [
      {
        username: 'username1',
        email: 'username1@example.com',
        password: 'username1pass123',
        phoneNumber: '09123456789',
        address: "Yogyakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'username2',
        email: 'username2@example.com',
        password: 'username2pass123',
        phoneNumber: '08122456689',
        address: "Palangkaraya",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'username3',
        email: 'username3@example.com',
        password: 'username3pass123',
        phoneNumber: '08123456789',
        address: "Riau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: {
        [Sequelize.Op.in]: ['username1', 'username2', 'username3', 'username4', 'username5']
      }
    }, {});
  }
};
