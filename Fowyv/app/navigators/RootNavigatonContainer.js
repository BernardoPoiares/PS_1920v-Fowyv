import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStackNavigator} from './AuthenticationStackNavigator.js';
import {MainStackNavigator} from './MainStackNavigator.js';
import {ChatStackNavigator} from './ChatStackNavigator.js';
import routes from 'res/routes';
import {SetProfile} from '../routes/SetProfile.js';
import {Loader} from '../components/Loader';
import {connect} from 'react-redux';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const RootContainer = props => {
  return (
    <View style={{flex: 1}}>
      {props.authenticateUser.isLoading && <Loader />}
      <NavigationContainer>
        {props.authenticateUser.isLoggedIn !== true ? (
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen
              name="AuthenticationStack"
              component={AuthenticationStackNavigator}
            />
          </RootStack.Navigator>
        ) : props.getUser.userDetails !== undefined &&
          props.getUser.userDetails !== null ? (
          <MainStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="MainStack" component={MainStackNavigator} />
            <RootStack.Screen name="ChatStack" component={ChatStackNavigator} />
          </MainStack.Navigator>
        ) : (
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name={routes.setProfile} component={SetProfile} />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
};

const mapStateToProps = state => ({
  authenticateUser: state.authReducer.authenticateUser,
  getUser: state.userReducer.getUser,
});

export const RootNavigatonContainer = connect(
  mapStateToProps,
  null,
)(RootContainer);
