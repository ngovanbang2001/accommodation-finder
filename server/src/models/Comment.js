'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'userComment' })
    }
  }

  Comment.init(
    {
      postId: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      imageAttach: DataTypes.STRING,
      videoAttach: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  )
  return Comment
}
