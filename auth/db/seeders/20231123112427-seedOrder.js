/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          dateExp: new Date("2023-11-29"),
          priority: true,
          userId: "5",
          problemId: "1",
          masterId: "1",
          comment: "",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-11-12"),
          priority: false,
          userId: "6",
          problemId: "2",
          masterId: "1",
          comment: "Все отлично, мастер молодец! Пробил унитаз руками",
        },
        {
          status: "pending",
          dateOpen: new Date("2022-12-12"),
          priority: true,
          userId: "3",
          problemId: "3",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-29"),
          priority: true,
          userId: "3",
          problemId: "4",
          masterId: "3",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-29"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "3",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2022-12-11"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "3",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-29"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "3",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-29"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "1",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-29"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "2",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-30"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "2",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-30"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "2",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-30"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "2",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-30"),
          priority: true,
          userId: "6",
          problemId: "4",
          masterId: "2",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-30"),
          priority: true,
          userId: "6",
          problemId: "5",
          masterId: "2",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2023-11-30"),
          priority: true,
          userId: "6",
          problemId: "6",
          masterId: "2",
          comment: "",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-11-12"),
          priority: false,
          userId: "6",
          problemId: "12",
          masterId: "4",
          comment: "Все отлично, мастер молодец! Пробил унитаз руками",
        },
        {
          status: "pending",
          dateOpen: new Date("2022-12-12"),
          priority: true,
          userId: "5",
          problemId: "13",
          comment: "",
        },
        {
          status: "active",
          dateOpen: new Date("2022-11-30"),
          dateExp: new Date("2022-12-11"),
          priority: true,
          userId: "6",
          problemId: "16",
          masterId: "3",
          comment: "",
        },
        {
          status: "pending",
          dateOpen: new Date("2022-12-12"),
          priority: true,
          userId: "5",
          problemId: "11",
          comment: "",
        },
        {
          status: "pending",
          dateOpen: new Date("2022-12-12"),
          priority: true,
          userId: "5",
          problemId: "15",
          comment: "",
        },
        {
          status: "pending",
          dateOpen: new Date("2022-12-12"),
          priority: true,
          userId: "5",
          problemId: "23",
          comment: "",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "1",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "2",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "3",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
        },
        {
          status: "closed",
          dateOpen: new Date("2022-12-10"),
          priority: true,
          userId: "5",
          problemId: "19",
          masterId: "4",
          comment: "asfsavds",
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
