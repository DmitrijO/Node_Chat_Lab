'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      login: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      // Timestamps
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        //defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};