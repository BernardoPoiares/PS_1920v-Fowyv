import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import routes from 'res/routes';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class NewAccount extends React.Component {
  onCreateAccountPressed = () => {
    this.props.navigation.navigate(routes.setProfile);
  };
  onBackPressed = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <View style={loginStyle.view}>
        <Text style={loginStyle.header}>Create an account</Text>
        <View style={loginStyle.container}>
          <View style={loginStyle.formContainer}>
            <Text style={loginStyle.formHeader}>Email</Text>
            <TextInput style={loginStyle.textInput} />
            <Text style={loginStyle.formHeader}>Password</Text>
            <TextInput secureTextEntry={true} style={loginStyle.textInput} />
            <Text style={loginStyle.formHeader}>Confirm Password</Text>
            <TextInput secureTextEntry={true} style={loginStyle.textInput} />
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

const loginStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    height: 300,
    width: (Dimensions.get('window').width / 3) * 2,
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
});
