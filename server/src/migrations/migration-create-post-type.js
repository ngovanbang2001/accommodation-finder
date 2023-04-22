'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PostTypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            priceForDay: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            priceForWeek: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            priceForMonth: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            features: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1,
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
        await queryInterface.dropTable('PostTypes');
    }
};