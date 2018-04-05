'use strict';

import express from 'express';
import models from '../dal/models';

const router = new express.Router();

router.get('/messages', (req, res) => {
  models.Message.findAll({
    order : ['createdAt' : 'DESC'], 
    limit : 100,
    include: [{
        model: models.User
    }]
  })
    .then((messages) => {
      const messagesResposneData = messages.map(item => {
        const reducedItem = {
          id: item.id,
          text: item.text,
          createdAt: item.createdAt,
          FromId: item.User ? item.User.login : ''
        }
        return reducedItem;
      });


      return res.status(200).json(messagesResposneData);
    })
    .catch(err => {
      return res.status(400).json({error: err});
    });
});

export default router;