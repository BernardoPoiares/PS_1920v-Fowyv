import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import routes from 'res/routes';

export class Login extends React.Component {
  onLoginPressed = () => {
    this.props.navigation.navigate('MainStack', {screen: routes.listen});
  };
  onNewAccountPressed = () => {
    this.props.navigation.navigate(routes.newAccount);
  };
  render() {
    return (
      <View style={loginStyle.view}>
        <Text style={loginStyle.header}>FOWYV</Text>
        <View style={loginStyle.container}>
          <Text style={loginStyle.formHeader}>Email</Text>
          <TextInput style={loginStyle.textInput} />
          <Text style={loginStyle.formHeader}>Password</Text>
          <TextInput secureTextEntry={true} style={loginStyle.textInput} />
          <TouchableOpacity
            style={loginStyle.formButton}
            onPress={this.onLoginPressed}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Text style={loginStyle.forgotPassword}>Forgot your password?</Text>
        </View>
        <TouchableOpacity onPress={this.onNewAccountPressed}>
          <Text style={loginStyle.newAccount}>Create an account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const loginStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  container: {
    width: '66.7%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  formHeader: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'moccasin',
    width: '80%',
    height: 35,
  },
  formButton: {
    backgroundColor: 'darkorange',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    textDecorationLine: 'underline',
  },
  newAccount: {
    color: 'white',
  },
});
