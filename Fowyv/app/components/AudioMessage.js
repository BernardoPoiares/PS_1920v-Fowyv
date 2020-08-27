import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {checkAudioFile, getAudioFilePath} from './../utils/filesUtils';
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
    if (checkAudioFile(this.props.audioPath, this.props.dispatch)) {
      const path = getAudioFilePath(this.props.audioPath);
      AudioPlayer.createSound(path, this.setSound);
    }
  }

  setSound = sound => {
    this.setState({hasAudio: true, sound: sound});
  };

  chooseAudioIcon = () => {
    return !this.state.isPlaying ? 'md-play-circle' : 'md-pause';
  };

  audioPlayingEnded = () => {
    this.setState({isPlaying: false});
  };

  onAudioIconPressed = () => {
    if (this.state.sound !== null) {
      if (!this.state.isPlaying) {
        AudioPlayer.playAudio(this.state.sound, this.audioPlayingEnded);
      } else {
        AudioPlayer.pauseAudio(this.state.sound);
        this.setState({isPlaying: false});
      }
      this.setState({isPlaying: !this.state.isPlaying});
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
