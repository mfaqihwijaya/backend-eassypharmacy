'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicineOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: { model: {
          tableName: 'Users',
        }, key: 'id' },
        type: Sequelize.INTEGER
      },
      medicineId: {
        allowNull: false,
        references: { model: {
          tableName: 'Medicines',
        }, key: 'id' },
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: true,
        references: { model: {
          tableName: 'Orders',
        }, key: 'id' },
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      },
      subTotal: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MedicineOrders');
  }
};