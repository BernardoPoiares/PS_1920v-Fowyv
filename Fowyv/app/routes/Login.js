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
import {setError} from '../redux/actions/global.actions';
import {loginUser} from '../redux/actions/auth.actions';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLoginPressed = () => {
    let error = FieldValidator.EmailValidator(this.state.email);
    if (error) {
      return this.props.dispatch(setError(new Error(error)));
    }
    error = FieldValidator.PasswordValidator(this.state.password);
    if (error) {
      return this.props.dispatch(setError(new Error(error)));
    }
    this.props.dispatch(
      loginUser({email: this.state.email, password: this.state.password}),
    );
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

  getPasswordError() {
    const msg = FieldValidator.PasswordValidator(this.state.password);
    if (msg != null) {
      return this.buildErrorMsg(msg);
    }
  }

  buildErrorMsg = msg => {
    return <Text style={loginStyle.inputError}>{msg}</Text>;
  };

  render() {
    return (
      <View style={loginStyle.view}>
        <Text style={loginStyle.header}>FOWYV </Text>
        <View style={loginStyle.container}>
          <View style={loginStyle.formContainer}>
            <Text style={loginStyle.formHeader}>Email</Text>
            <TextInput
              onChangeText={this.onEmailChanged}
              style={loginStyle.textInput}
              value={this.state.email}
            />
            {this.state.email !== '' ? this.getEmailError() : null}
          </View>
          <View style={loginStyle.formContainer}>
            <Text style={loginStyle.formHeader}>Password</Text>
            <TextInput
              onChangeText={this.onPasswordChanged}
              secureTextEntry={true}
              style={loginStyle.textInput}
            />
            {this.state.password !== '' ? this.getPasswordError() : null}
          </View>
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
    minHeight: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
    margin: 10,
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
    padding: 0,
    paddingLeft: 5,
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
    margin: 10,
  },
  newAccount: {
    color: 'white',
  },
  inputError: {
    color: 'red',
    fontSize: 12,
  },
});
