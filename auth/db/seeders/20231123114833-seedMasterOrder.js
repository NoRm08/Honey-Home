/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "MasterOrders",
      [
        {
          orderId: 1,
          masterId: 1,
          date: '12.10.2023'
        },

        {
          orderId: 2,
          masterId: 2,
          date: '20.10.2023'
        },

        {
          orderId: 3,
          masterId: 3,
          date: '16.11.2023'
        },

        {
          orderId: 4,
          masterId: 4,
          date: '9.11.2023'
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
