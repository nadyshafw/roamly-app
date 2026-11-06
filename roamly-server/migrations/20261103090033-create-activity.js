'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Trips",
          key: "id"
        }, 
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      day: {
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      note: {
        type: Sequelize.TEXT
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activities');
  }
};