'use strict';

import express from 'express';
import models from '../dal/models';
import passport from 'passport';

const router = new express.Router();

function login(req, res, next) {
  return passport.authenticate(
    'local-login',
    function(err, token, info) {
      console.log('aaa1');
      if (err) {
        console.log('err1' + err);
        return next(err);
      }

      if (token) {
        return res.status(200).json({
          success: true,
          message: info ? info.message : '',
          token: token,
          user: (info && info.user) ? info.user : ''
        });
      }
      else {
        return res.status(404).json({
          success: false,
          message: info ? info.message : ''
        });
      }
    }
  )(req, res, next);
}

router.post('/login', login);



module.exports = router;
