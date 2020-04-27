import React from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AudioRecorder} from '../components/AudioRecorder.js';
import {AudioMessage} from '../components/AudioMessage.js';
import uuid from 'react-native-uuid';
import {AudioUtils} from 'react-native-audio';

const DATA = [];

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPath: AudioUtils.DocumentDirectoryPath + uuid.v4() + '.aac',
    };
  }

  finishedRecording = async audioPath => {
    DATA.push({audioPath: audioPath});
    this.setState({
      audioPath: AudioUtils.DocumentDirectoryPath + uuid.v4() + '.aac',
    });
  };

  render() {
    return (
      <View style={chatStyle.container}>
        <StatusBar barStyle="light-content" backgroundColor="darkorange" />
        <View style={chatStyle.chatContainer}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <AudioMessage audioPath={item.audioPath} />}
          />
        </View>
        <View style={chatStyle.interactionContainer}>
          <TextInput
            style={chatStyle.messageInput}
            multiline
            numberOfLines={4}
          />
          <View style={chatStyle.microphoneContainer}>
            <AudioRecorder
              audioPath={this.state.audioPath}
              finishedRecording={this.finishedRecording}
              iconSize={15}
              iconColor={'white'}
              iconStyle={chatStyle.microphone}
            />
          </View>
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
