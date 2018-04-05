import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import auth from '../utils/auth';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
	    open: !auth.isUserAuthenticated(),
	    username: '',
	   	password: '',
	   	authenticated: auth.isUserAuthenticated()
	  };

	  this.handleOpen = this.handleOpen.bind(this);
	  this.handleClose = this.handleClose.bind(this);
	  this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
	}	

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  onLoginFormSubmit() {
  	const userData = {
      username: encodeURIComponent(this.state.username),
      password: encodeURIComponent(this.state.password)
    };

  	axios.post('/auth/login', userData, {timeout: 10000})
      .then(response =>{
        if (response && response.data && response.data.token && response.data.user) {

          console.log(response.data);
          auth.authenticateUser(response.data.token, response.data.user);
          this.handleClose();
          this.setState({authenticated: true});
        }
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });

  	
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onLoginFormSubmit}
      />,
    ];

    return (
      <div>
      <AppBar
        title="Chat"
        iconClassNameLeft ="testME"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
        {!this.state.authenticated &&
          <RaisedButton label="Click here for login" onClick={this.handleOpen} style={{position:'absolute', left:0, right:0}} />
        } 
        <Dialog
          title="Login Form"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{
			      textAlign:'center'
			    }}
        >
          <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             value={this.state.username}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               value={this.state.password}
               />
             <br/>
        </Dialog>
      </div>
    );
  }
}

export default Header;