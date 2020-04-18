import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import routes from 'res/routes';

export class Login extends React.Component {
  onLoginPressed = () => {
    this.props.navigation.navigate('Main', {screen: routes.listen});
  };

  render() {
    return (
      <View style={loginStyle.View}>
        <Text style={loginStyle.Header}>FOWYV</Text>
        <View style={loginStyle.Container}>
          <Text style={loginStyle.FormHeader}>Email</Text>
          <TextInput style={loginStyle.TextInput} />
          <Text style={loginStyle.FormHeader}>Password</Text>
          <TextInput secureTextEntry={true} style={loginStyle.TextInput} />
          <TouchableOpacity
            style={loginStyle.FormButton}
            onPress={this.onLoginPressed}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Text style={loginStyle.ForgotPassword}>Forgot your password?</Text>
        </View>
        <Text style={loginStyle.NewAccount}>Create an account</Text>
      </View>
    );
  }
}

const loginStyle = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  Container: {
    width: '66.7%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  FormHeader: {
    fontSize: 20,
  },
  TextInput: {
    backgroundColor: 'moccasin',
    width: '80%',
    height: 35,
  },
  FormButton: {
    backgroundColor: 'darkorange',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ForgotPassword: {
    textDecorationLine: 'underline',
  },
  NewAccount: {
    color: 'white',
  },
});
