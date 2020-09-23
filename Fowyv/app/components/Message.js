import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AudioMessage} from './AudioMessage';

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.message) {
      return (
        <View>
          {this.props.message.type === 'AUDIO' ? (
            <View
              style={StyleSheet.compose(
                messageStyle.audioContainer,
                this.props.rightModeLayout
                  ? messageStyle.rightModeAudio
                  : messageStyle.leftModeAudio,
              )}>
              <AudioMessage audioFilename={this.props.message.content} />
              <Text style={messageStyle.date}>{this.props.message.date}</Text>
            </View>
          ) : this.props.message.type === 'TEXT' ? (
            <View
              style={StyleSheet.compose(
                messageStyle.container,
                this.props.rightModeLayout
                  ? messageStyle.rightModeTextContainer
                  : messageStyle.leftModeTextContainer,
              )}>
              <TouchableOpacity
                style={StyleSheet.compose(
                  messageStyle.textContainer,
                  this.props.rightModeLayout
                    ? messageStyle.rightModeText
                    : messageStyle.leftModeText,
                )}>
                <Text style={messageStyle.text}>
                  {this.props.message.content}
                </Text>
              </TouchableOpacity>
              <Text style={messageStyle.date}>{this.props.message.date}</Text>
            </View>
          ) : null}
        </View>
      );
    }
    return null;
  }
}

const messageStyle = StyleSheet.create({
  container: {
    margin: 15,
  },
  textContainer: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5,
  },
  leftModeTextContainer: {
    alignItems: 'flex-start',
  },
  leftModeText: {
    backgroundColor: 'darkorange',
  },
  rightModeTextContainer: {
    alignItems: 'flex-end',
  },
  rightModeText: {
    backgroundColor: 'yellow',
  },
  audioContainer: {
    alignItems: 'flex-start',
    margin: 15,
  },
  leftModeAudio: {
    alignItems: 'flex-start',
  },
  rightModeAudio: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 15,
    justifyContent: 'center',
    color: 'black',
    margin: 10,
  },
  date: {
    fontSize: 10,
    justifyContent: 'center',
    color: 'black',
    opacity: 0.5,
  },
});
