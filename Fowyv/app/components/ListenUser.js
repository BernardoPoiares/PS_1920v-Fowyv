import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getUserPersonalAudio} from '../redux/actions/user.actions';
import {getLocalAudioFilePath, requestAudioFile} from './../utils/filesUtils';
import {AudioPlayer} from '../utils/AudioPlayer.js';

export class ListenUserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAudio: false,
      sound: null,
      isPlaying: false,
      audioFilename: props.audioFile,
    };
  }

  getPersonalAudio = async () => {
    return await this.props.dispatch(
      getUserPersonalAudio({audioFile: this.state.audioFilename}),
    );
  };

  async componentDidMount() {
    if (this.state.audioFilename !== null) {
      let audioPath = await getLocalAudioFilePath(
        this.state.audioFilename,
        this.getPersonalAudio,
      );
      if (audioPath) {
        AudioPlayer.createSound(audioPath, this.setSound);
      }
    }
  }

  setSound = sound => {
    if (sound == null) {
      requestAudioFile(this.state.audioFilename, this.props.dispatch);
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
    } else if (this.state.audioFilename !== null) {
      let audioPath = await getLocalAudioFilePath(
        this.state.audioFilename,
        this.getPersonalAudio,
      );
      if (audioPath) {
        AudioPlayer.createSound(audioPath, this.setSound);
      }
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const ListenUser = connect(
  null,
  mapDispatchToProps,
)(ListenUserComponent);

const listenUserStyle = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round(Dimensions.get('window').width),
    backgroundColor: 'darkorange',
    resizeMode: 'cover',
    borderRadius: 20,
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
