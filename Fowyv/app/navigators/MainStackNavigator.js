import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ListenLobby} from '../routes/ListenLobby.js';
import {MatchLobby} from '../routes/MatchLobby.js';
import {Settings} from '../routes/Settings.js';

import {NavBar} from '../components/NavBar.js';

const MainStack = createStackNavigator();

const stackNavigate = navigation => {
  return route => {
    navigation.navigate(route);
  };
};

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        header: ({scene, previous, navigation}) => {
          return (
            <NavBar
              route={scene.route.name}
              navigate={stackNavigate(navigation)}
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
