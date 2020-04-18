import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStackNavigator} from './AuthenticationStackNavigator.js';
import {MainStackNavigator} from './MainStackNavigator.js';
import {ChatStackNavigator} from './ChatStackNavigator.js';

const RootStack = createStackNavigator();

export const RootNavigatonContainer = () => {
  return (
    <NavigationContainer>
      {
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen
            name="AuthenticationStack"
            component={AuthenticationStackNavigator}
          />
          <RootStack.Screen name="MainStack" component={MainStackNavigator} />
          <RootStack.Screen name="ChatStack" component={ChatStackNavigator} />
        </RootStack.Navigator>
      }
    </NavigationContainer>
  );
};
