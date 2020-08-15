import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity>
        <View style={messageStyle.container}>
          <Text style={messageStyle.text}>{this.props.message.content}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const messageStyle = StyleSheet.create({
  container: {
    width: '10%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
