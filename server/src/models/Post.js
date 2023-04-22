'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Post.hasOne(models.FavoritePost, { foreignKey: 'postId', as: 'post' })
    }
  }

  Post.init(
    {
      title: DataTypes.STRING,
      lane: DataTypes.STRING,
      street: DataTypes.STRING,
      houseNumber: DataTypes.STRING,
      area: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      totalPayment: DataTypes.FLOAT,
      deposit: DataTypes.FLOAT,
      province: DataTypes.STRING,
      typeOfApartment: DataTypes.STRING,
      numberOfBedrooms: DataTypes.INTEGER,
      numberOfToilet: DataTypes.INTEGER,
      ward: DataTypes.STRING,
      district: DataTypes.STRING,
      isStayWithHost: DataTypes.BOOLEAN,
      isPrivateToilet: DataTypes.BOOLEAN,
      isFurniture: DataTypes.INTEGER,
      images: DataTypes.TEXT,
      reasonReject: DataTypes.TEXT,
      video: DataTypes.STRING,
      userId: DataTypes.STRING,
      category: DataTypes.INTEGER,
      kindOfTime: DataTypes.INTEGER,
      tradingForm: DataTypes.INTEGER,
      duration: DataTypes.STRING,
      timeNumber: DataTypes.INTEGER,
      floor: DataTypes.INTEGER,
      apartmentCode: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  )
  return Post
}
