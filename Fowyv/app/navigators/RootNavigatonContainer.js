import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStackNavigator} from './AuthenticationStackNavigator.js';
import {MainStackNavigator} from './MainStackNavigator.js';

const RootStack = createStackNavigator();

export const RootNavigatonContainer = () => {
  return (
    <NavigationContainer>
      {
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen
            name="Authentication"
            component={AuthenticationStackNavigator}
          />
          <RootStack.Screen name="Main" component={MainStackNavigator} />
        </RootStack.Navigator>
      }
    </NavigationContainer>
  );
};
