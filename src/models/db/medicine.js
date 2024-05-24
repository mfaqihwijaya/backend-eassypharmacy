'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.hasMany(models.MedicineOrder, { foreignKey: 'medicineId' });
      Medicine.belongsTo(models.MedicineCategory, { foreignKey: 'categoryId' });
    }
  }
  Medicine.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    indication: DataTypes.TEXT,
    contraIndication: DataTypes.TEXT,
    composition: DataTypes.TEXT,
    dose: DataTypes.TEXT,
    usage: DataTypes.TEXT,
    sideEffect: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};