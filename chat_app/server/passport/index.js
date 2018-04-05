'use strict';

import passport from 'passport';
import {Strategy} from 'passport-local';
import models from '../dal/models';
import jwt from 'jsonwebtoken';

const loginLocalStrategy = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
  },
  function (username, password, done) {
  return models.User.findOne({ where: {login: username} })
    .then(existedUser => {
      console.log('aaaa2');
      
      if (!existedUser) {
        const userData = {
          login: username,
          password: password
        };

        models.User.create(userData)
          .then(createdUser => {
            const token = signJwt(createdUser);

            const userData = {
              login: createdUser.login,
              id: createdUser.id
            };
          
            return done(null, token, {message: 'Создан новый пользователь', user: userData});
          })
          .catch(err => {
            console.log("err" + err);
            return done(err);
          });
      }
      else {
        existedUser.comparePassword(password, (err, success) => {
          console.log(err);
          console.log(success);

          if (err || !success ) {
            return done(null, false, {message: 'Неверный логин или пароль'});
          }

          const token = signJwt(existedUser);
          
          const userData = {
            login: existedUser.login,
            id: existedUser.id
          };

          return done(null, token, {message: 'Вход выполнен успешно', user: existedUser});
        });   
      }    
    })
    .catch(err => {
      console.log("err" + err);
      return done(err);
    });
  }
);

function signJwt(user) {
  const payload = {
    sub: user.id
  };

  // create a token string
  return jwt.sign(payload, 'testjwt');
}

export default function getPassport() { 
  passport.use('local-login', loginLocalStrategy);
  return passport;
}