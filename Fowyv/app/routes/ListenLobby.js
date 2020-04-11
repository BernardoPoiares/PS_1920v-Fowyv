import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class ListenLobby extends React.Component {
  render() {
    return (
      <View style={listenLobbyStyle.View}>
        <Icon name="md-play-circle" size={150} color="white" />
        <Text style={listenLobbyStyle.Name}>Jessica</Text>
        <Text style={listenLobbyStyle.Age}>23</Text>
      </View>
    );
  }
}

const listenLobbyStyle = StyleSheet.create({
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
  Age: {
    fontSize: 20,
    color: 'white',
  },
});
