import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {FieldValidator} from '../utils/FieldValidator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createAccount} from '../redux/actions/auth.actions';
import {setError} from '../redux/actions/global.actions';
import {connect} from 'react-redux';

class NewAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onCreateAccountPressed = () => {
    let error = FieldValidator.EmailValidator(this.state.email);
    if (error) {
      return this.props.dispatch(setError(new Error(error)));
    }

    error = FieldValidator.PasswordValidator(this.state.password);
    if (error) {
      return this.props.dispatch(setError(new Error(error)));
    }

    error = FieldValidator.PasswordValidator(this.state.confirmPassword);
    if (error) {
      return this.props.dispatch(setError(new Error('Confirm ' + error)));
    }

    if (this.state.password === this.state.confirmPassword) {
      this.props.dispatch(
        createAccount({
          email: this.state.email,
          password: this.state.password,
        }),
      );
    } else {
      this.props.dispatch(setError(new Error('Passwords are not the same')));
    }
  };
  onBackPressed = () => {
    this.props.navigation.goBack(null);
  };

  onEmailChanged = value => {
    this.setState({email: value});
  };

  onPasswordChanged = value => {
    this.setState({password: value});
  };

  onPasswordConfirmChanged = value => {
    this.setState({confirmPassword: value});
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

  getPasswordConfirmError() {
    const msg = FieldValidator.PasswordValidator(this.state.confirmPassword);
    if (msg != null) {
      return this.buildErrorMsg('Confirm ' + msg);
    }
  }

  buildErrorMsg = msg => {
    return <Text style={newAccountStyle.inputError}>{msg}</Text>;
  };

  render() {
    return (
      <View style={newAccountStyle.view}>
        <Text style={newAccountStyle.header}>Create an account</Text>
        <View style={newAccountStyle.container}>
          <View style={newAccountStyle.formContainer}>
            <Text style={newAccountStyle.formHeader}>Email</Text>
            <TextInput
              style={newAccountStyle.textInput}
              onChangeText={this.onEmailChanged}
            />
            {this.state.email !== '' ? this.getEmailError() : null}
          </View>
          <View style={newAccountStyle.formContainer}>
            <Text style={newAccountStyle.formHeader}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={newAccountStyle.textInput}
              onChangeText={this.onPasswordChanged}
            />
            {this.state.password !== '' ? this.getPasswordError() : null}
          </View>
          <View style={newAccountStyle.formContainer}>
            <Text style={newAccountStyle.formHeader}>Confirm Password</Text>
            <TextInput
              secureTextEntry={true}
              style={newAccountStyle.textInput}
              onChangeText={this.onPasswordConfirmChanged}
            />
            {this.state.confirmPassword !== ''
              ? this.getPasswordConfirmError()
              : null}
          </View>
          <TouchableOpacity
            style={newAccountStyle.formButton}
            onPress={this.onCreateAccountPressed}>
            <Text>Create account</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={newAccountStyle.backContainer}
          onPress={this.onBackPressed}>
          <Icon name="backward" size={30} color="white" />
          <Text style={newAccountStyle.backHeader}>Back</Text>
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

export const NewAccount = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAccountComponent);

const newAccountStyle = StyleSheet.create({
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
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  header: {
    fontSize: 20,
    color: 'white',
  },
  formHeader: {
    fontSize: 20,
  },
  textInput: {
    padding: 0,
    paddingLeft: 5,
    backgroundColor: 'moccasin',
    width: '70%',
    height: 35,
  },
  formButton: {
    backgroundColor: 'darkorange',
    borderWidth: 1,
    padding: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 5,
  },
  backHeader: {
    color: 'white',
    fontSize: 30,
    marginLeft: 5,
  },
  inputError: {
    fontSize: 12,
    color: 'red',
  },
});
