import React from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import 'react-native-gesture-handler';

import {RootNavigatonContainer} from './app/navigators/RootNavigatonContainer.js';

export class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('darkorange');
  }

  render() {
    return <RootNavigatonContainer />;
  }
}

export default App;
