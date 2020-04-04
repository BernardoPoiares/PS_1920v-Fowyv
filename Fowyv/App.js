import React from 'react';
import {StatusBar} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './app/routes/Home.js';
import {Login} from './app/routes/Login.js';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  );
}

export class App extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('orange');
  }
  render() {
    return (
      <NavigationContainer>
        {
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Main" component={MainStackScreen} />
          </RootStack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

export default App;
