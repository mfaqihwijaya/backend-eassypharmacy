'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      indication: {
        type: Sequelize.TEXT
      },
      contraIndication: {
        type: Sequelize.TEXT
      },
      composition: {
        type: Sequelize.TEXT
      },
      dose: {
        type: Sequelize.TEXT
      },
      usage: {
        type: Sequelize.TEXT
      },
      sideEffects: {
        type: Sequelize.TEXT
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      stock: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      categoryId: {
        allowNull: false,
        references: { model: {
          tableName: 'MedicineCategories',
        }, key: 'id'},
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Medicines');
  }
};