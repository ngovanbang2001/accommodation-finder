'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      senderLastMessage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isUser1NewChat: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isUser2NewChat: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lastMessage: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }, async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  }
};