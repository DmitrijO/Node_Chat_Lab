'use strict';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import models from './dal/models';
import io from 'socket.io';
import getPassport from './passport';
import authRotes from './routes/auth';
import mustAuth from './routes/mustAuth';
import messages from './routes/messages';
import saveMessage from './controllers/messages';

const PORT = 8008;

const app = express();
const passport = getPassport();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const server = http.createServer(app);
const socketIO = io(server);

app.use('/static', express.static(__dirname + '/static'));

app.use('/auth', authRotes);
app.use('/authOnly', mustAuth);
app.use('/authOnly', messages);

models.sequelize.sync()
  .then(() => {    
    //io.listen(server, options);
    socketIO.on('connection', onSocketConnection);
    server.listen(PORT);

    // server.on('error', onError);
    // server.on('listening', onListening);
    console.log('Express server listenning on ' + PORT + ' port');
   
    }
  )
  .catch(err => console.log('Error while launching DB: ' + err));


function onSocketConnection(client) {

  client.on('message', function (message) {
    saveMessage(message, (success, savedMessage) => {
      if (success) {
        client.broadcast.emit('messageSend', savedMessage);
        client.emit('messageSend', savedMessage);
      }
    });

    // try {
    //   client.emit('messageSend', message);
    //   client.broadcast.emit('messageSend', message);
    // } catch (e) {
    //   console.log(e);
    //   client.disconnect();
    // }
  });
}