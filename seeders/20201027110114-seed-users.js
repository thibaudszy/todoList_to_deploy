"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "John Doe",
          email: "john@email.com",
          phone: "003348484332",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jim Doe",
          email: "jim@email.com",
          phone: "003348484342",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bob Doe",
          email: "bob@email.com",
          phone: "003348484337",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
