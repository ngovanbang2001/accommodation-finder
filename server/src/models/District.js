'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {}
  }

  District.init(
    {
      fullName: DataTypes.STRING,
      provinceCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'District',
      timestamps: false,
    }
  )
  return District
}
