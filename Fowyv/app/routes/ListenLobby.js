import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class ListenLobby extends React.Component {
  render() {
    return (
      <View style={homeStyle.View}>
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
  Logo: {width: 200, height: 200, resizeMode: 'contain'},
  Name: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  Description: {fontSize: 20},
});
