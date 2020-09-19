import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStackNavigator} from './AuthenticationStackNavigator.js';
import {MainStackNavigator} from './MainStackNavigator.js';
import {ChatStackNavigator} from './ChatStackNavigator.js';
import routes from 'res/routes';
import {SetProfile} from '../routes/SetProfile.js';
import {Loader} from '../components/Loader';
import {connect} from 'react-redux';
import {getUserDetails} from '../redux/actions/user.actions';
import {ModalMessage} from '../components/ModalMessage.js';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(
      getUserDetails({token: this.props.authenticateUser.token}),
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.authenticateUser.isLoading && <Loader />}
        <ModalMessage modalVisible={true} />
        <NavigationContainer>
          {this.props.authenticateUser.isLoggedIn !== true ? (
            <RootStack.Navigator screenOptions={{headerShown: false}}>
              <RootStack.Screen
                name="AuthenticationStack"
                component={AuthenticationStackNavigator}
              />
            </RootStack.Navigator>
          ) : this.props.getUser.userDetails !== undefined &&
            this.props.getUser.userDetails !== null ? (
            <MainStack.Navigator screenOptions={{headerShown: false}}>
              <RootStack.Screen
                name="MainStack"
                component={MainStackNavigator}
              />
              <RootStack.Screen
                name="ChatStack"
                component={ChatStackNavigator}
              />
            </MainStack.Navigator>
          ) : (
            <RootStack.Navigator screenOptions={{headerShown: false}}>
              <RootStack.Screen
                name={routes.setProfile}
                component={SetProfile}
              />
            </RootStack.Navigator>
          )}
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authenticateUser: state.authReducer.authenticateUser,
  getUser: state.userReducer.getUser,
});

export const RootNavigatonContainer = connect(
  mapStateToProps,
  null,
)(RootContainer);
