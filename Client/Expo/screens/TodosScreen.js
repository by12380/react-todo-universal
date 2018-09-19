import React from 'react';
import {
    View,
    Button,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { login, refreshAccessToken } from '../actions/auth0';

class LoginScreen extends React.Component {

    constructor(props){
        super(props)

    }

    static navigationOptions = {
        title: 'Links',
    };

    componentDidUpdate() {
        this.onRefreshTokenError();
        this.redirectToHome();
    }

    renderItem = ({item}) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
                <Ionicons name="md-checkmark-circle" size={30} color="#1b75d6" style={{flex:1/6}} />
                <View style={{flexDirection: 'row', flex: 5/6}} >
                    <Text style={{fontSize: 16}}>{item.key}</Text>
                </View>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1/6, justifyContent: 'flex-end'}} onPress={() => this.props.navigation.navigate('Detail', {id: item.key})}>
                <Ionicons name="ios-arrow-dropright" size={28} />
                </TouchableOpacity>
            </View>
        )
    }

  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator}/>
    )
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={[{key: 'Some text here'}, {key: 'b'}]}
        renderItem={this.renderItem}/>
    )
  }
}

let styles = StyleSheet.create({
        root: {
        backgroundColor: 'white'
      },
      searchContainer: {
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: 60,
        alignItems: 'center'
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        flex: 1,
        backgroundColor: 'red',
        paddingRight: 0
      },
      avatar: {
        marginRight: 16
      },
      separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'red'
      },
      welcomeImage: {
        borderRadius: 50,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
      },
});

const mapStateToProps = (state) => {

    return {
        isAuthenticated:
            new Date().getTime() <
            (state.authReducer.sessionItems ? state.authReducer.sessionItems.expiresAt : null),
        refreshError: state.authReducer.refreshError,
        refreshToken: state.authReducer.sessionItems.refreshToken,
        user: state.userReducer.user,
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        login,
        refreshAccessToken
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);