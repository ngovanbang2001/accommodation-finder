'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Deposits', {
            depositId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            bank: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
        await queryInterface.dropTable('Deposits');
    }
};