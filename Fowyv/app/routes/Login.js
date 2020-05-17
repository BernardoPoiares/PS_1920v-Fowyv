import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import routes from 'res/routes';

import {FieldValidator} from '../utils/FieldValidator';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/auth.actions';
import {Loader} from '../components/Loader';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  onLoginPressed = () => {
    //this.props.navigation.navigate('MainStack', {screen: routes.listen});
    this.props.dispatch(loginUser(null));
  };
  onNewAccountPressed = () => {
    this.props.navigation.navigate(routes.newAccount);
  };

  onEmailChanged = value => {
    this.setState({email: value});
  };

  onPasswordChanged = value => {
    this.setState({password: value});
  };

  getEmailError() {
    const msg = FieldValidator.EmailValidator(this.state.email);
    if (msg != null) {
      return this.buildErrorMsg(msg);
    }
  }

  getPasswordError() {}

  buildErrorMsg = msg => {
    return <TextInput style={loginStyle.inputError} value={msg} />;
  };

  render() {
    return (
      <View style={loginStyle.view}>
        <Text style={loginStyle.header}>FOWYV</Text>
        <View style={loginStyle.container}>
          <Text style={loginStyle.formHeader}>Email</Text>
          <TextInput
            onChangeText={this.onEmailChanged}
            style={loginStyle.textInput}
            value={this.state.email}
          />
          {this.getEmailError()}
          <Text style={loginStyle.formHeader}>Password</Text>
          <TextInput secureTextEntry={true} style={loginStyle.textInput} />
          {this.getPasswordError()}
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

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);

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
  inputError: {
    color: 'red',
    width: '80%',
    fontSize: 12,
  },
});
