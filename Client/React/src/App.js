import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import Profile from './components/Profile';
import LogIn from './components/LogIn';
import Callback from './components/Callback';
import Todo from './components/Todo';
import { loadSession } from './actions/authActions';
import { APP_SERVER_URL } from './config';
import { configSocketIO } from './socket-io';
import {
    ELECTRON_APP_MAC_DOWNLOAD_URL,
    ELECTRON_APP_WIN_DOWNLOAD_URL } from './config';

import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

const socket = io(APP_SERVER_URL);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scoketConnected: false
    }

    props.loadSession();
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated && !this.state.scoketConnected) {
      configSocketIO(socket, {user_id: this.props.user_id});
      this.setState({scoketConnected: true});
    }
  }

  render() {

    return (
      <Router>
        <div className="App">
          <nav className="navbar">
            <ul>
              <li><NavLink exact to="/">Todo</NavLink></li>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <div className="btn-group-right">
                <a href={ELECTRON_APP_MAC_DOWNLOAD_URL}>
                  <button class="download-btn mac-download">
                    <i className="fas fa-download"></i>
                    Mac
                  </button>
                </a>
                <a href={ELECTRON_APP_WIN_DOWNLOAD_URL}>
                  <button class="download-btn win-download">
                    <i className="fas fa-download"></i>
                    Windows
                  </button>
                </a>
              </div>
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
    user_id: state.userReducer.profile.sub
  }
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    loadSession
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(App);