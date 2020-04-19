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

import Icon from 'react-native-vector-icons/FontAwesome5';

export class SetProfile extends React.Component {
  onSetAccount = () => {
    this.props.navigation.navigate('MainStack', routes.listen);
  };
  render() {
    return (
      <View style={loginStyle.view}>
        <Text style={loginStyle.header}>Set Profile</Text>
        <View style={loginStyle.container}>
          <View style={loginStyle.formContainer}>
            <Text style={loginStyle.formHeader}>Name</Text>
            <TextInput style={loginStyle.textInput} />
            <Text style={loginStyle.formHeader}>Age</Text>
            <TextInput secureTextEntry={true} style={loginStyle.textInput} />
            <TouchableOpacity
              style={loginStyle.playContainer}
              onPress={this.onSetAccount}>
              <Text style={loginStyle.playHeader}>Play</Text>
              <Icon name="play" size={30} color="black" />
            </TouchableOpacity>
          </View>
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
  playContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'darkorange',
    margin: 5,
  },
  playHeader: {
    color: 'black',
    fontSize: 30,
    marginRight: 5,
  },
});
