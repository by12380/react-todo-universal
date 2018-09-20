import React from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { login, refreshAccessToken } from '../actions/auth0';
import { updateItem, deleteItem } from '../actions/todoActions';

class TodoEditScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit',
    };

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            input: params.item.title,
            item: params.item
        }
    }

    onSave = () => {
        if (this.state.input) {
            const item = this.state.item;
            item.title = this.state.input.trim();
            this.props.updateItem(this.props.token, item);
            this.props.navigation.goBack();
        }
    }

    onDelete = () => {
        this.props.deleteItem(this.props.token, this.state.item);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                style={{fontSize: 26, margin: 20, padding: 10, backgroundColor: 'white', borderRadius: 5, borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
                value={this.state.item.title}
                onChangeText={(input) => this.setState({input})} />
                <View style={{padding: 20}}>
                    <Button title="Save" onPress={this.onSave}></Button>
                </View>
                <View style={{padding: 10}}>
                    <Button title="Delete" onPress={this.onDelete}></Button>
                </View>
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
        refreshToken: state.authReducer.sessionItems.refreshToken,
        token: state.authReducer.sessionItems.accessToken
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        login,
        refreshAccessToken,
        updateItem,
        deleteItem
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditScreen);