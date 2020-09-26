import React from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AudioRecorder} from '../components/AudioRecorder.js';
import {Message} from '../components/Message.js';
import {connect} from 'react-redux';
import {
  sendTextMessage,
  sendAudioFile,
} from '../redux/actions/messages.actions';

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      userEmail: props.route.params.userMatch,
      refresh: false,
      length: props.messagesLength,
      match: props.match,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match === null) {
      this.props.navigation.navigate('MainStack', {
        screen: 'MatchLobby',
      });
    }
    return true;
  }

  finishedRecording = async audioPath => {
    this.props
      .dispatch(
        sendAudioFile({
          userEmail: this.state.userEmail,
          audioPath: audioPath,
        }),
      )
      .then(this.setState({refresh: true}));
  };

  onTextMessageChanged = value => {
    this.setState({textMessage: value});
  };

  onSendPressed = () => {
    if (this.state.textMessage.length > 0) {
      this.props.dispatch(
        sendTextMessage({
          userEmail: this.state.userEmail,
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

  showTextInput = () => {
    const audioMessages = this.state.match.messages.filter(
      message => message.type === 'AUDIO',
    );
    return (
      audioMessages.length > 0 &&
      audioMessages.filter(message => message.user === this.state.userEmail)
        .length >= 3 &&
      audioMessages.filter(message => message.user !== this.state.userEmail)
        .length >= 3
    );
  };

  render() {
    return (
      <View style={chatStyle.container}>
        <StatusBar barStyle="light-content" backgroundColor="darkorange" />
        <View style={chatStyle.chatContainer}>
          {this.areMessagesToShow() ? (
            <FlatList
              extraData={this.state.refresh}
              ref={ref => {
                this.flatListRef = ref;
              }}
              keyExtractor={item => item.id}
              onContentSizeChange={() => {
                this.flatListRef.scrollToEnd({animation: true});
              }}
              data={this.state.match.messages}
              renderItem={({item}) => (
                <Message
                  message={item}
                  rightModeLayout={this.state.userEmail !== item.user}
                />
              )}
            />
          ) : null}
        </View>
        <View style={chatStyle.interactionContainer}>
          {this.showTextInput() ? (
            <View style={chatStyle.textInteractionContainer}>
              <TouchableOpacity
                style={chatStyle.sendContainer}
                onPress={this.onSendPressed}>
                <Icon
                  name={'long-arrow-alt-up'}
                  size={15}
                  color={'darkorange'}
                  style={this.state.sendIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={chatStyle.messageInput}
                multiline
                numberOfLines={4}
                value={this.state.textMessage}
                onChangeText={this.onTextMessageChanged}
              />
            </View>
          ) : null}
          <View style={chatStyle.microphoneContainer}>
            <AudioRecorder
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

const mapStateToProps = (state, ownProps) => {
  if (
    state.messagesReducer.userMessages.matches !== undefined &&
    state.messagesReducer.userMessages.matches != null
  ) {
    const match = state.messagesReducer.userMessages.matches.find(
      mat =>
        mat.emails.includes(state.authReducer.authenticateUser.email) &&
        mat.emails.includes(ownProps.route.params.userMatch),
    );
    return {
      match: match,
      messagesLength: match.messages.length,
    };
  }
  return {match: null, messagesLength: 0};
};

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
  textInteractionContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkorange',
  },
  messageInput: {
    padding: 0,
    paddingLeft: 5,
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
