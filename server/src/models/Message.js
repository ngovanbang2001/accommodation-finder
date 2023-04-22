'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {}
  }

  Message.init(
    {
      chatId: DataTypes.INTEGER,
      senderId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      image: DataTypes.TEXT,
      video: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  )
  return Message
}
