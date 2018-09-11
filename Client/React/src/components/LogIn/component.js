import React, { Component } from 'react';
import { logIn, refreshAccessToken } from '../../utils/auth0';
import { REACT_UNIVERSAL_REPO_URL } from '../../config';
import './LogIn.css';


class LogIn extends Component {

    componentDidMount() {
        //If renew access token fails, start login prompt
        if (this.props.refreshError) {
            logIn();
            return;
        }
    }

    onLogin = () => {
        refreshAccessToken();
    }

    render() {
        return (
            <div>
                <h1 class="site-header">Todos</h1>
                <p className="app-description">
                    Universal, cross platform todos app built from <a href={REACT_UNIVERSAL_REPO_URL} target="_blank">React Universal</a> starter kit
                </p>
                <button className='login-btn' onClick={this.onLogin}>
                    Log In
                </button>
            </div>
        );
    }
}

export default LogIn;