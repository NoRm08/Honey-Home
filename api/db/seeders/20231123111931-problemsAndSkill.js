const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    const skillsData = [
      { name: "Электрика", createdAt: currentDate, updatedAt: currentDate },
      { name: "Сантехника", createdAt: currentDate, updatedAt: currentDate },
      { name: "Мебель", createdAt: currentDate, updatedAt: currentDate },
      { name: "Компьютеры", createdAt: currentDate, updatedAt: currentDate },
      // Добавьте другие умения, если необходимо
    ];

    // Пример данных для проблем (problems)
    const problemsData = [
      // Проблемы для умения "Электрика"
      { name: 'Замена розетки', skillId: 1, problemTime: 30 },
      { name: 'Неисправность электроплиты', skillId: 1, problemTime: 60 },
      { name: 'Подключение стиральной машины', skillId: 1, problemTime: 30 },
      { name: 'Починить выключатель', skillId: 1, problemTime: 30 },
      { name: 'Заменить выключатель', skillId: 1, problemTime: 30 },
      { name: 'Замена лампочки', skillId: 1, problemTime: 10 },
      { name: 'Установить диммер', skillId: 1, problemTime: 15 },
      { name: 'Заменить люстру', skillId: 1, problemTime: 45 },
      { name: 'Проложить проводку', skillId: 1, problemTime: 25 },

      // Проблемы для умения "Сантехника"
      { name: 'Протечка воды', skillId: 2, problemTime: 60 },
      { name: 'Замена смесителя', skillId: 2, problemTime: 45 },
      { name: 'Починить сифон', skillId: 2, problemTime: 60 },
      { name: 'Заменить сифон', skillId: 2, problemTime: 30 },
      { name: 'Низкое давление воды в душе', skillId: 2, problemTime: 30 },
      {
        name: 'Неисправность в системе отопления',
        skillId: 2,
        problemTime: 60,
      },
      { name: 'Замена раковины', skillId: 2, problemTime: 60 },
      { name: 'Замена душевой лейки', skillId: 2, problemTime: 30 },
      { name: 'Замена гибкой подводки', skillId: 2, problemTime: 30 },

      // Проблемы для умения "Мелкий ремонт"
      { name: 'Мотаж полки', skillId: 3, problemTime: 30 },
      { name: 'Сборка мебели', skillId: 3, problemTime: 180 },
      { name: 'Замена замка', skillId: 3, problemTime: 60 },
      { name: 'Замена двери', skillId: 3, problemTime: 60 },
      { name: 'Починить кровать', skillId: 3, problemTime: 60 },
      { name: 'Перетянуть кровать/диван', skillId: 3, problemTime: 120 },
      { name: 'Ремонт стула', skillId: 3, problemTime: 30 },
      { name: 'Замена стекла', skillId: 3, problemTime: 60 },
      { name: 'Монтаж вешалки', skillId: 3, problemTime: 30 },
      { name: 'Мотаж зеркала', skillId: 3, problemTime: 30 },

      // Проблемы для умения "Компьютеры"
      { name: 'Переустановить windows', skillId: 4, problemTime: 60 },
      { name: 'Подключить принтер', skillId: 4, problemTime: 30 },
      { name: 'Настроить интеренет', skillId: 4, problemTime: 30 },
      { name: 'Установить ПО', skillId: 4, problemTime: 30 },
      { name: 'Почистить компьютер', skillId: 4, problemTime: 60 },
      { name: 'Устранить неполадки', skillId: 4, problemTime: 45 },
      { name: 'Восстановить данные', skillId: 4, problemTime: 60 },
    ];


    await queryInterface.bulkInsert("Skills", skillsData, {});
    await queryInterface.bulkInsert("Problems", problemsData, {});
  },

  async down(queryInterface, Sequelize) {},
};
