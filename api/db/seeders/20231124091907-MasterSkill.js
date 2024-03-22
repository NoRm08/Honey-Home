"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        masterId: 1,
        skillId: 1,
      },
      {
        masterId: 1,
        skillId: 2,
      },
      {
        masterId: 2,
        skillId: 1,
      },
      {
        masterId: 2,
        skillId: 3,
      },
      {
        masterId: 3,
        skillId: 1,
      },
      {
        masterId: 3,
        skillId: 2,
      },
      {
        masterId: 3,
        skillId: 3,
      },
      {
        masterId: 4,
        skillId: 4,
      },
    ];
    await queryInterface.bulkInsert("MasterSkills", data, {});
  },

  async down(queryInterface, Sequelize) {},
};
