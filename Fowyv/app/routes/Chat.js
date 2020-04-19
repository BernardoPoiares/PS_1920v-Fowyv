import React from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class Chat extends React.Component {
  render() {
    return (
      <View style={chatStyle.container}>
        <StatusBar barStyle="light-content" backgroundColor="darkorange" />
        <View style={chatStyle.chatContainer}>
          <ScrollView>
            <Text>asdasd</Text>
          </ScrollView>
        </View>
        <View style={chatStyle.interactionContainer}>
          <TextInput
            style={chatStyle.messageInput}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={chatStyle.microphoneContainer}>
            <Icon name="microphone" size={15} style={chatStyle.microphone} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const chatStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkorange',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  interactionContainer: {
    height: 60,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkorange',
  },
  messageInput: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: '5%',
  },
  microphoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    marginRight: '5%',
  },
  microphone: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'darkorange',
    padding: 10,
  },
});
