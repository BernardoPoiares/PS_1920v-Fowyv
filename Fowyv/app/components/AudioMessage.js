import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AudioPlayer} from '../utils/AudioPlayer.js';

export class AudioMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAudio: false,
      sound: null,
      isPlaying: false,
    };
  }

  componentDidMount() {
    AudioPlayer.createSound(this.props.audioPath, this.setSound);
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
