'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.MedicineOrder, { foreignKey: 'orderId'});
      Order.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    status: DataTypes.INTEGER,
    address: DataTypes.STRING,
    paidAt: DataTypes.DATE,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Order',
  });
  return Order;
};