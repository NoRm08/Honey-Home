const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = [
      {
        name: "Ахмед Толдиев",
        email: "ahmed@mail.ru",
        hashpass: bcrypt.hashSync("qweqwe", 10),
        telephone: "+1 (555) 123-4567",
        img: "http://localhost:3001/images/Ahmed.jpeg",
        experience: 5,
        raiting: 4.8,
      },
      {
        name: "Алексей Кораблев",
        email: "jane.smith@example.com",
        hashpass: bcrypt.hashSync("eeeeee", 10),
        telephone: "+1 (555) 987-6543",
        img: "http://localhost:3001/images/Alex.jpeg",
        experience: 8,
        raiting: 4.5,
      },
      {
        name: "Валентин Мысякин",
        email: "alex.johnson@example.com",
        hashpass: bcrypt.hashSync("wwwwww", 10),
        telephone: "+1 (555) 567-8901",
        img: "http://localhost:3001/images/Valya.jpeg",
        experience: 3,
        raiting: 4.2,
      },
      {
        name: "Илона Коростелева",
        email: "emily.davis@example.com",
        hashpass: bcrypt.hashSync("111222", 10),
        telephone: "+1 (555) 234-5678",
        img: "http://localhost:3001/images/Ilona.jpeg",
        experience: 6,
        raiting: 4.9,
      },
    ];
    await queryInterface.bulkInsert("Masters", data, {});
  },

  async down(queryInterface, Sequelize) {},
};
