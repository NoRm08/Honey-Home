const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "Иван Петров",
        email: "ivan@mail.ru",
        hashpass: bcrypt.hashSync("userpass123", 10),
        role: "user",
        address: "ул. Пушкина, д. 10",
        img: "https://ic.pics.livejournal.com/misscaprizzz/85343571/502668/502668_original.jpg",
        telephone: "89112233445",
        subscribeLevl: "1",
      },
      {
        name: "Admin",
        email: "admin1@admin",
        hashpass: bcrypt.hashSync("admin", 10),
        role: "admin",
        address: "",
        telephone: "89446728965",
        subscribeLevl: "0",
      },
      {
        name: "Мария Поплавская",
        email: "maria@gmail.com",
        hashpass: bcrypt.hashSync("secureUserPass", 10),
        role: "user",
        img: "https://ca.slack-edge.com/T04UWAV6RD4-U04UWB3J6QN-3d76a1ee426b-512",
        address: "пр. Ленина, д. 5",
        telephone: "89663332211",
        subscribeLevl: "1",
      },
      {
        name: "Алексей Попов",
        email: "alex@yahoo.com",
        hashpass: bcrypt.hashSync("userPass12345", 10),
        role: "user",
        address: "ул. Гагарина, д. 15",
        telephone: "89775556666",
        subscribeLevl: "1",
      },
      {
        name: "Екатерина Иванова",
        email: "ekaterina@hotmail.com",
        hashpass: bcrypt.hashSync("4321userPass", 10),
        role: "user",
        address: "пр. Сталина, д. 25",
        telephone: "89334445555",
        subscribeLevl: "1",
      },
      {
        name: "Admin",
        email: "1@1",
        img: "https://bit.ly/kent-c-dodds",
        hashpass: bcrypt.hashSync("1", 10),
        role: "admin",
        address: "",
        telephone: "89446728965",
        subscribeLevl: "0",
      },
      {
        name: "Kirill",
        email: "2@2",
        hashpass: bcrypt.hashSync("2", 10),
        role: "user",
        address: "",
        telephone: "89446728965",
        subscribeLevl: "0",
      },
      {
        name: "Ахмед Толдиев",
        email: "ahmed@mail.ru",
        hashpass: bcrypt.hashSync("qweqwe", 10),
        role: "master",
        subscribeLevl: "0",
      },
    ];
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {},
};
