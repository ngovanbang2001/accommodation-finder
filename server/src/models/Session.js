'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.User, { foreignKey: 'userId', as: 'userLoggedIn' })
    }
  }

  Session.init(
    {
      sessionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      fcmToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Session',
    }
  )
  return Session
}
