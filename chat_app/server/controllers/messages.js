import models from '../dal/models';

export default function saveMessage(messageData, done) {
  if (!messageData || !messageData.user || !messageData.message) {
    console.log(messageData);
    console.log(messageData.user);
    console.log(messageData.message);
    done(false, null);
  }
  else {
    const messageForDbInsert = {
      text: messageData.message,
      FromId: messageData.user
    };

    console.log(messageForDbInsert);

    models.Message.create(messageForDbInsert)
      .then(insertedMessage => {
        insertedMessage.FromId = messageData.login;
        console.log('insertedMessage');
        console.log(insertedMessage);
        done(true, insertedMessage);
      })
      .catch(err => {
        console.log(err);
        done(false, null);
      });
  }
}