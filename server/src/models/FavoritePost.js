'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class FavoritePost extends Model {
    static associate(models) {
      FavoritePost.belongsTo(models.User, { foreignKey: 'userId', as: 'userFavorite' })
      FavoritePost.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' })
    }
  }

  FavoritePost.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FavoritePost',
    }
  )
  return FavoritePost
}
