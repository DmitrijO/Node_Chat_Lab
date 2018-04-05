import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './HomePage.css';
import auth from '../utils/auth';
import openSocket from 'socket.io-client';
import axios from 'axios';


const dateFormat = require('dateformat');

const  socket = openSocket('http://localhost:8008');

function MessageText(props) {

    const content = props.messages.map((message) => {
      const className = message.FromId === props.currentUser.login ? "new-message new-message-self" : "new-message";
      const name = message.FromId === props.currentUser.login ? "You" :message.FromId;
      const messageDate = dateFormat(message.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      return (
        <div className={className} key={message.id}>
          <div className="message">
            <h3 className="message-author">{name} write at <span className="message-date">{messageDate}</span></h3>
            <p className="message-text">{message.text}</p>
          </div>
        </div>
      );
    });

    return (
      <div>
        {content}
      </div>
    );
  }


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: auth.isUserAuthenticated(),
      message: '',
      messageList: [],
      user: JSON.parse(auth.getUser())
    };

    this.onMessageSend = this.onMessageSend.bind(this);
    this.subscribeToSendMessage = this.subscribeToSendMessage.bind(this);
    socket.on('messageSend', message => this.subscribeToSendMessage(message));
  }

  onMessageSend() {
    if (this.state.authenticated) {
      const user = JSON.parse(auth.getUser());

      const messageData = {
        message: this.state.message,
        user: user.id,
        login: user.login
      }

      socket.emit('message', messageData);

      this.setState({message: ''});
      console.log(this.state);
    }    
  }

  subscribeToSendMessage(message) {
    if (this.state.authenticated) {
      const messageList = this.state.messageList;
      messageList.push(message);
      this.setState({messageList: messageList});
    }
  };

  componentDidMount() {
    const token = auth.getToken();
    const authHeader = `JWT ${token}`;

    axios.get('/authOnly/messages', { headers: {
            "timeout": 10000, 
            "Authorization": authHeader 
    }})
      .then(response =>{      
        if (response && response.data) {
          this.setState({messageList:response.data});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }  
  
  render() {
    return (
      <Card className="container">
        <div id="messageArea">
          <MessageText messages={this.state.messageList} currentUser={this.state.user}/>
        </div>
        <TextField
          hintText="Enter your Message"
          floatingLabelText="Message"
          onChange = {(event,newValue) => this.setState({message:newValue})}
          value={this.state.message}
          style={{'margin-right':'10px'}}
        />
        <RaisedButton label="Send" primary={true} onClick={this.onMessageSend}/>
      </Card>
    );
  }
  
}

export default HomePage;