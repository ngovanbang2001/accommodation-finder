'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notifications', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            directLink: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isViewed: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0,
            },
            isRead: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        },);
    }, async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notifications');
    }
};