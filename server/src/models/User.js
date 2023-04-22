'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Post, { foreignKey: 'userId', as: 'userPost' })
      User.hasMany(models.Notification, { foreignKey: 'userId', as: 'userNotification' })
      User.hasMany(models.Deposit, { foreignKey: 'userId', as: 'userDeposit' })
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'userComment' })
      User.hasMany(models.FavoritePost, { foreignKey: 'userId', as: 'userFavorite' })
      User.hasMany(models.Session, { foreignKey: 'userId', as: 'userLoggedIn' })
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      imageCover: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      dateOfBirth: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      from: DataTypes.STRING,
      uid: DataTypes.STRING,
      address: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
