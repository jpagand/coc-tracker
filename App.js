import 'react-native-console-time-polyfill';
import React, { Component } from 'react';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './clashEntities/reducers';
import RootStack from './RootStack';

const persistConfig = {
 key: 'root',
 storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isReady: false};
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Supercell-magic': require('./assets/fonts/Supercell-magic-webfont.ttf')
    });
    this.setState({isReady: true})
  }
  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return <Expo.AppLoading />
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<Expo.AppLoading />} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>

    );
  }
}

export default App
