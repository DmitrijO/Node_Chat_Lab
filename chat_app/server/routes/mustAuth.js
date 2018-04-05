'use strict';

import jwt from 'jsonwebtoken';
import models from '../dal/models';

export default function mustAuthenticate(req, res, next){
  if (!req || !req.headers || !req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, 'testjwt', (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    models.User.findById(userId)
      .then((user) => {
        console.log('UserFound');
        console.log(JSON.stringify(user));
        req.user = user;
        return next();
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        return res.status(401).end();
      });
  });
}