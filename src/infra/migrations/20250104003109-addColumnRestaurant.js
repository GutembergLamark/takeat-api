'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('restaurants', 'canceled_at', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('restaurants', 'canceled_at');
  }
};
