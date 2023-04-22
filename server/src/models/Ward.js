'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    static associate(models) {}
  }

  Ward.init(
    {
      fullName: DataTypes.STRING,
      districtCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Ward',
      timestamps: false,
    }
  )
  return Ward
}
