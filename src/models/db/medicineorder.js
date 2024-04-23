'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicineOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicineOrder.belongsTo(models.User, { foreignKey: 'userId' });
      MedicineOrder.belongsTo(models.Medicine, { foreignKey: 'medicineId' });
    }
  }
  MedicineOrder.init({
    userId: DataTypes.INTEGER,
    medicineId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    subTotal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'MedicineOrder',
  });
  return MedicineOrder;
};