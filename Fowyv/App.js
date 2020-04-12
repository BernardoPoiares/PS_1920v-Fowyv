import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './app/routes/Home.js';
import {Login} from './app/routes/Login.js';
import {ListenLobby} from './app/routes/ListenLobby.js';
import {MatchLobby} from './app/routes/MatchLobby.js';
import {Settings} from './app/routes/Settings.js';
import {NavBar} from './app/components/NavBar.js';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

export class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('darkorange');
  }

  MainStackScreen() {
    return (
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Login" component={Login} />
      </MainStack.Navigator>
    );
  }

  RootStackScreen = ({navigation, route}) => {
    return (
      <MainStack.Navigator
        screenOptions={{
          header: ({scene, previous, navigation}) => {
            return (
              <NavBar
                route={scene.route.name}
                navigate={this.rootNavigate(navigation)}
              />
            );
          },
          headerMode: 'screen',
        }}>
        <MainStack.Screen
          name="ListenLobby"
          options={{
            animationEnabled: false,
          }}
          component={ListenLobby}
        />
        <MainStack.Screen
          name="MatchLobby"
          options={{
            animationEnabled: false,
          }}
          component={MatchLobby}
        />
        <MainStack.Screen
          name="Settings"
          options={{
            animationEnabled: false,
          }}
          component={Settings}
        />
      </MainStack.Navigator>
    );
  };
  rootNavigate = navigation => {
    return route => {
      navigation.navigate(route);
    };
  };

  render() {
    return (
      <NavigationContainer>
        {
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Main" component={this.MainStackScreen} />
            <RootStack.Screen name="Root" component={this.RootStackScreen} />
          </RootStack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

export default App;
