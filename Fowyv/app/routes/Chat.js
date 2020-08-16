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
import {Message} from '../components/Message.js';
import uuid from 'react-native-uuid';
import {connect} from 'react-redux';
import {AudioUtils} from 'react-native-audio';
import {sendTextMessage} from '../redux/actions/messages.actions';

const DATA = [];

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      audioPath: AudioUtils.DocumentDirectoryPath + uuid.v4() + '.aac',
      user: props.route.params.userMatch,
      match: props.matches
        ? props.matches.find(
            match =>
              match.users.includes(this.props.authenticatedUser.email) &&
              match.users.includes(props.route.params.userMatch),
          )
        : null,
    };
  }

  finishedRecording = async audioPath => {
    DATA.push({audioPath: audioPath});
    this.setState({
      audioPath: AudioUtils.DocumentDirectoryPath + uuid.v4() + '.aac',
    });
  };

  onTextMessageChanged = value => {
    this.setState({textMessage: value});
  };

  onSendPressed = () => {
    if (this.state.textMessage.length > 0) {
      this.props.dispatch(
        sendTextMessage({
          userEmail: this.state.user,
          message: this.state.textMessage,
        }),
      );
      this.setState({textMessage: ''});
    }
  };

  areMessagesToShow = () => {
    return (
      this.state.match &&
      this.state.match.messages !== undefined &&
      this.state.match.messages.length > 0
    );
  };

  render() {
    return (
      <View style={chatStyle.container}>
        <StatusBar barStyle="light-content" backgroundColor="darkorange" />
        <View style={chatStyle.chatContainer}>
          {this.areMessagesToShow() ? (
            <FlatList
              data={this.state.match.messages}
              //renderItem={({item}) => <AudioMessage audioPath={item.audioPath} />}
              renderItem={({item}) => (
                <Message
                  message={item}
                  rightModeLayout={this.state.user != item.user}
                />
              )}
            />
          ) : null}
        </View>
        <View style={chatStyle.interactionContainer}>
          <TouchableOpacity
            style={chatStyle.sendContainer}
            onPress={this.onSendPressed}>
            <Icon
              name={'long-arrow-alt-up'}
              size={15}
              color={'darkorange'}
              style={this.props.sendIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={chatStyle.messageInput}
            multiline
            numberOfLines={4}
            value={this.state.textMessage}
            onChangeText={this.onTextMessageChanged}
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

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
  matches: state.messagesReducer.userMessages.matches,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const Chat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatComponent);

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
    width: '65%',
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
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    marginLeft: '5%',
  },
  sendIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'darkorange',
    padding: 10,
  },
});
