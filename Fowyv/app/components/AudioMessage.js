import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAudioFilePath, requestAudioFile} from './../utils/filesUtils';
import {AudioPlayer} from '../utils/AudioPlayer.js';

export class AudioMessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAudio: false,
      sound: null,
      isPlaying: false,
    };
  }

  componentDidMount() {
    AudioPlayer.createSound(
      getAudioFilePath(this.props.audioFilename),
      this.setSound,
    );
  }

  componentWillUnmount() {
    if (this.state.sound) {
      this.state.sound.release();
    }
  }


  setSound = sound => {
    if (sound == null) {
      requestAudioFile(this.props.audioFilename, this.props.dispatch);
    } else {
      this.setState({hasAudio: true, sound: sound});
    }
  };

  chooseAudioIcon = () => {
    return !this.state.isPlaying ? 'md-play-circle' : 'md-pause';
  };

  audioPlayingEnded = () => {
    this.setState({isPlaying: false});
  };

  onAudioIconPressed = async () => {
    if (this.state.sound !== null) {
      if (!this.state.isPlaying) {
        AudioPlayer.playAudio(this.state.sound, this.audioPlayingEnded);
      } else {
        AudioPlayer.pauseAudio(this.state.sound);
        this.setState({isPlaying: false});
      }
      this.setState({isPlaying: !this.state.isPlaying});
    } else {
      AudioPlayer.createSound(
        getAudioFilePath(this.props.audioFilename),
        this.setSound,
      );
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onAudioIconPressed}>
        <Icon name="md-play-circle" size={30} color="darkorange" />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
  usersFound: state.userFunctionalities.searchUsers.users,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const AudioMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioMessageComponent);
