'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Provinces', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        },);
    }, async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Provinces');
    }
};