import React from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import 'react-native-gesture-handler';

import {RootNavigatonContainer} from './app/navigators/RootNavigatonContainer.js';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import persist from './app/redux/store.js';

const persistStore = persist();

export default class App extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('darkorange');
  }

  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <RootNavigatonContainer />
        </PersistGate>
      </Provider>
    );
  }
}
