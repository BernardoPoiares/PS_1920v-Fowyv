import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

export class Home extends React.Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  render() {
    return (
      <View style={homeStyle.View}>
        <Image
          style={homeStyle.Logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={homeStyle.Name}>FOWYV</Text>
        <Text style={homeStyle.Description}>find others with your voice</Text>
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  Logo: {width: 180, height: 180, resizeMode: 'contain'},
  Name: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  Description: {fontSize: 20},
});
