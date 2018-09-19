import React from 'react';
import {
    View,
    Button,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { login, refreshAccessToken } from '../actions/auth0';

class TodoDetailScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit',
    };

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            id: params.id
        }
    }

    componentDidUpdate() {
        this.onRefreshTokenError();
        this.redirectToHome();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.id}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    logInContainer: {
        marginTop: 50
    }
})

const mapStateToProps = (state) => {

    return {
        isAuthenticated:
            new Date().getTime() <
            (state.authReducer.sessionItems ? state.authReducer.sessionItems.expiresAt : null),
        refreshError: state.authReducer.refreshError,
        refreshToken: state.authReducer.sessionItems.refreshToken
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        login,
        refreshAccessToken
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetailScreen);