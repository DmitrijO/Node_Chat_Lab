'use strict';

import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    login: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeSave: function(user) {
        if (user.changed('password')) {
          return bcrypt.hash(user.get('password'), 10)
            .then(success => {
              user.password = success;
            })
            .catch(err => {
              if (err) {
                console.log(`Error while hashing password for new User with Username ${user.login}: ${err}`);
              }
            });
        }
      }
    }
  });

   /**
   * Compare the passed password with the value in the database. A model method.
   *
   * @param {string} password
   * @returns {object} callback
   */
  User.prototype.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
  };

  /**
   * Set Many-To-Many realation with Shops model through UserShops table
   *
   * @param {models} Sequelize Models collection
   */
  User.associate = (models) => {
    User.hasMany(models.Message, {as: 'Messages'});
  };

  return User;
};
