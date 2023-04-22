'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Wards', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            districtCode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    }, async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Wards');
    }
};