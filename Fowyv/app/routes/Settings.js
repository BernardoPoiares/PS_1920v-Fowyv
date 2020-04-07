import React from 'react';
import {View, StyleSheet} from 'react-native';

export class Settings extends React.Component {
  render() {
    return <View style={homeStyle.View} />;
  }
}

const homeStyle = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  Logo: {width: 200, height: 200, resizeMode: 'contain'},
  Name: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  Description: {fontSize: 20},
});
