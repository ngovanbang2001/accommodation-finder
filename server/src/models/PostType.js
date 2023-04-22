'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PostType extends Model {
    static associate(models) {}
  }

  PostType.init(
    {
      title: DataTypes.STRING,
      priceForDay: DataTypes.FLOAT,
      priceForWeek: DataTypes.FLOAT,
      priceForMonth: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      features: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'PostType',
    }
  )
  return PostType
}
