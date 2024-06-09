"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Settlements", "lastUpdatedBy", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("Settlements", "lastUpdatedBy");
  },
};
