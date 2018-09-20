import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { loadSession } from './actions/authActions';
import { joinRoomSuccess } from './actions/socketActions';
import io from 'socket.io-client';
import { initSubscriber } from './subscriber-client';
import { APP_SERVER_URL } from './config';

const socket = io(APP_SERVER_URL);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    initSubscriber(socket);

    store.dispatch(loadSession());
    store.subscribe(() => {
      this.onSocketConnect();
    })
  }

  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  onSocketConnect = () => {
    const state = store.getState();
    const user_id = state.userReducer.user.sub;
    const socketConnected = state.socketReducer.connectSuccess;
    const roomJoined = state.socketReducer.joinRoomSuccess;

    if ( socketConnected && user_id && !roomJoined ) {
        socket.emit('room', user_id);
        store.dispatch(joinRoomSuccess());
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//create the redux store
export const store = createStore(
  reducers,
  applyMiddleware(thunk)
);
