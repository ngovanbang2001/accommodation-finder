'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {}
  }

  Chat.init(
    {
      userId1: DataTypes.INTEGER,
      userId2: DataTypes.INTEGER,
      senderLastMessage: DataTypes.INTEGER,
      isUser1NewChat: DataTypes.BOOLEAN,
      isUser2NewChat: DataTypes.BOOLEAN,
      lastMessage: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Chat',
    }
  )
  return Chat
}
