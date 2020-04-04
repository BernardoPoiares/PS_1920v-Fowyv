import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

export class Home extends React.Component {
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
    backgroundColor: 'orange',
  },
  Logo: {width: 180, height: 180, resizeMode: 'contain'},
  Name: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  Description: {fontSize: 20},
});
