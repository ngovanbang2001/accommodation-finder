'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {}
  }

  Province.init(
    {
      fullName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Province',
      timestamps: false,
    }
  )
  return Province
}
