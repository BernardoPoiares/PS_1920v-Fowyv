import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {FieldValidator} from '../utils/FieldValidator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createUser} from '../redux/actions/auth.actions';
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
    this.props.dispatch(
      createUser({
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      }),
    );
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
    this.setState({passwordConfirm: value});
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
    const msg = FieldValidator.PasswordValidator(this.state.passwordConfirm);
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
        <Text style={loginStyle.header}>Create an account</Text>
        <View style={loginStyle.container}>
          <View style={loginStyle.formContainer}>
            <Text style={loginStyle.formHeader}>Email</Text>
            <TextInput
              style={loginStyle.textInput}
              onChangeText={this.onEmailChanged}
            />
            {this.getEmailError()}
            <Text style={loginStyle.formHeader}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={loginStyle.textInput}
              onChangeText={this.onPasswordChanged}
            />
            {this.getPasswordError()}
            <Text style={loginStyle.formHeader}>Confirm Password</Text>
            <TextInput
              secureTextEntry={true}
              style={loginStyle.textInput}
              onChangeText={this.onPasswordConfirmChanged}
            />
            {this.getPasswordConfirmError()}
            <TouchableOpacity
              style={loginStyle.formButton}
              onPress={this.onCreateAccountPressed}>
              <Text>Create account</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={loginStyle.backContainer}
            onPress={this.onBackPressed}>
            <Icon name="backward" size={30} color="white" />
            <Text style={loginStyle.backHeader}>Back</Text>
          </TouchableOpacity>
        </View>
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
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    color: 'white',
  },
  formHeader: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'moccasin',
    width: '70%',
    height: 35,
  },
  formButton: {
    backgroundColor: 'darkorange',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
