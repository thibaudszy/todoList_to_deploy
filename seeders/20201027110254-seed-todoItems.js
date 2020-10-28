"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "laundry",
          deadline: "tomorrow",
          important: true,
          todoListId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "prepare meeting",
          deadline: "friday 25/10",
          important: false,
          todoListId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "run 5k",
          deadline: "Saturday 26/10",
          important: true,
          todoListId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
