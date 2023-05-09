'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lane: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      houseNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalPayment: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      deposit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      typeOfApartment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ward: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isStayWithHost: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      numberOfBedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfToilet: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isPrivateToilet: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isFurniture: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      floor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      apartmentCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reasonReject: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      video: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kindOfTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tradingForm: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts')
  },
}
