'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      FromId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'FromId',
        }
      }
      // Timestamps
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        //defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Messages');
  }
};