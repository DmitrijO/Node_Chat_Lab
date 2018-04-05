import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from '../scenes/HomePage.jsx';

class MainContent extends React.Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>
      </main>
    );
  }
}


export default MainContent;