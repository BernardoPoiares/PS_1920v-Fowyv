import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../routes/Home.js';
import {Login} from '../routes/Login.js';

const AuthenticationStack = createStackNavigator();

export const AuthenticationStackNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{headerShown: false}}>
      <AuthenticationStack.Screen name="Home" component={Home} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};
