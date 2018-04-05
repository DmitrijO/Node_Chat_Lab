import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  
  constructor(props) {
    super(props);   
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <Header/>
          <MainContent/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
