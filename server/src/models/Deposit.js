'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Deposit extends Model {
    static associate(models) {
      Deposit.belongsTo(models.User, { foreignKey: 'userId', as: 'userDeposit' })
    }
  }

  Deposit.init(
    {
      depositId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      amount: DataTypes.FLOAT,
      bank: DataTypes.STRING,
      status: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Deposit',
    }
  )
  return Deposit
}
