'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'userNotification' })
    }
  }

  Notification.init(
    {
      content: DataTypes.TEXT,
      type: DataTypes.INTEGER,
      directLink: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isViewed: DataTypes.BOOLEAN,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  )
  return Notification
}
