/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      dateOpen: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      dateExp: {
        type: Sequelize.DATE,
      },
      priority: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      problemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Problems",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      masterId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Masters",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      problemImg: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },

      userAccept:{
        type: Sequelize.BOOLEAN,
      },

      masterAccept:{
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
