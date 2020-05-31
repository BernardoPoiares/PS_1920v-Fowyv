import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AudioPlayer} from '../utils/AudioPlayer.js';

export class ListenUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPath: 'testsound.aac',
      hasAudio: false,
      sound: null,
      isPlaying: false,
    };
  }

  componentDidMount() {
    AudioPlayer.createSound(this.state.audioPath, this.setSound);
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
      <View style={listenUserStyle.Container}>
        <TouchableOpacity onPress={this.onAudioIconPressed}>
          <Icon name="md-play-circle" size={150} color="white" />
        </TouchableOpacity>
        <Text style={listenUserStyle.Name}>{this.props.name}</Text>
        <Text style={listenUserStyle.Age}>{this.props.age}</Text>
      </View>
    );
  }
}

const listenUserStyle = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round(Dimensions.get('window').width),
    backgroundColor: 'darkorange',
  },
  Logo: {width: 200, height: 200, resizeMode: 'contain'},
  Name: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  Age: {
    fontSize: 20,
    color: 'white',
  },
});
