import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={StyleSheet.compose(
          messageStyle.container,
          this.props.rightModeLayout
            ? messageStyle.rightMode
            : messageStyle.leftMode,
        )}>
        <Text style={messageStyle.text}>{this.props.message.content}</Text>
      </TouchableOpacity>
    );
  }
}

const messageStyle = StyleSheet.create({
  container: {
    fontSize: 20,
    alignItems: 'flex-start',
    backgroundColor: 'darkorange',
    borderWidth: 1,
    margin: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    opacity: 0.7,
  },
  leftMode: {
    marginRight: 50,
  },
  rightMode: {
    marginLeft: 50,
    backgroundColor: 'yellow',
  },
  text: {
    fontSize: 15,
    justifyContent: 'center',
    color: 'black',
    margin: 10,
  },
});