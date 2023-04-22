'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            uid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            imageCover: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            from: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            displayName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1
            },
            dateOfBirth: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            balance: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            bio: {
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
        await queryInterface.dropTable('Users');
    }
};