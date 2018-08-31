import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from './components/Profile';
import LogIn from './components/LogIn';
import Callback from './components/Callback';
import Todo from './components/Todo';
import { loadSession } from './actions/authActions';

import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

class App extends Component {

  constructor(props) {
    super(props);

    props.loadSession();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar">
            <ul>
              <li><NavLink exact to="/">Todo</NavLink></li>
              <li><NavLink to="/profile">Profile</NavLink></li>
            </ul>
          </nav>
          <main>
            <div>
              <Route exact path="/" render={() => this.props.isAuthenticated ? <Todo /> : <Redirect to='/login' />} />
              <Route exact path="/profile" render={() => this.props.isAuthenticated ? <Profile /> : <Redirect to='/login' />} />
              <Route exact path="/login" render={() => !this.props.isAuthenticated ? <LogIn /> : <Redirect to='/' />} />
              <Route exact path="/callback" component={Callback} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      new Date().getTime() <
      (state.authReducer.sessionItems ? state.authReducer.sessionItems.expiresAt : null),
  }
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    loadSession
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(App);