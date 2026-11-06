'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = [
      {
        username: "ixia",
        email: "hai@gmail.com",
        password: hashPass("12345"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    const trip = [
      {
        userId: 1,
        destination: "Bali",
        title: "Trip Bali",
        days: 2,
        startDate: "2026-11-05",
        budget: 3000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    const activity = [
      {
        tripId: 1,
        title: "Nusa Penida",
        day: 1,
        note: "Seru dan menyenangkan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tripId: 1,
        title: "Pantai Kuta",
        day: 2,
        note: "Cantik dan indah",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Users', user, {})
    await queryInterface.bulkInsert('Trips', trip, {})
    await queryInterface.bulkInsert("Activities", activity, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Activities", null, {});
    await queryInterface.bulkDelete('Trips', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
