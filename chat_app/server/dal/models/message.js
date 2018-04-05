'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    FromId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {foreignKey: 'FromId', targetKey: 'id'})
  };

  return Message;
};