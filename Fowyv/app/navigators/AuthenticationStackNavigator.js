import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import routes from 'res/routes';

import {Home} from '../routes/Home.js';
import {Login} from '../routes/Login.js';
import {NewAccount} from '../routes/NewAccount.js';
import {SetProfile} from '../routes/SetProfile.js';

const AuthenticationStack = createStackNavigator();

export const AuthenticationStackNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{headerShown: false}}>
      <AuthenticationStack.Screen name={routes.home} component={Home} />
      <AuthenticationStack.Screen name={routes.login} component={Login} />
      <AuthenticationStack.Screen
        name={routes.newAccount}
        component={NewAccount}
      />
      <AuthenticationStack.Screen
        name={routes.setProfile}
        component={SetProfile}
      />
    </AuthenticationStack.Navigator>
  );
};
