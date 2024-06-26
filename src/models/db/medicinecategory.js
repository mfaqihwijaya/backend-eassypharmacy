'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicineCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicineCategory.hasMany(models.Medicine, { foreignKey: 'categoryId' });
    }
  }
  MedicineCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'MedicineCategory',
  });
  return MedicineCategory;
};