import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAudioFilePath, requestAudioFile} from './../utils/filesUtils';

import {PersonalAudioRecorder} from '../components/PersonalAudioRecorder';
import {connect} from 'react-redux';

import {AudioPlayer} from '../utils/AudioPlayer.js';

class PersonalAudioContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sound: null, 
      audioFilename: props.audioFilename,
    };
  }

  componentDidMount() {
    if (this.state.audioFilename !== null) {
      AudioPlayer.createSound(
        getAudioFilePath(this.state.audioFilename),
        this.setSound,
      );
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.audioFilename !== this.props.audioFilename) {
      AudioPlayer.createSound(
        getAudioFilePath(nextProps.audioFilename),
        this.setSound,
      );
    }
  }

  setSound = sound => {
    if (sound == null) {
      requestAudioFile(this.state.audioFilename, this.props.dispatch);
    } else {
      this.setState({hasAudio: true, sound: sound});
    }
  };

  onRecordPersonalAudioPressed = () => {
    this.setState({modalVisible: !this.state.modalVisible});
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
    } else if (this.state.audioFilename !== null) {
      AudioPlayer.createSound(
        getAudioFilePath(this.state.audioFilename),
        this.setSound,
      );
    }
  };

  render() {
    return (
      <View>
        <PersonalAudioRecorder
          modalVisible={this.state.modalVisible}
          goBack={this.onRecordPersonalAudioPressed}
          audioFileRecorded={this.props.onAudioFileRecorded}
        />
        <View style={personalAudioContainerStyle.container}>
          <TouchableOpacity
            style={personalAudioContainerStyle.iconContainer}
            onPress={this.onAudioIconPressed}>
            <Icon
              name="md-play-circle"
              size={60}
              color={this.props.iconColor}
            />
          </TouchableOpacity>
          <View style={personalAudioContainerStyle.buttonsContainer}>
            <TouchableOpacity
              style={StyleSheet.compose(
                personalAudioContainerStyle.formButton,
                this.props.propsStyle.formButton,
              )}
              onPress={this.onRecordPersonalAudioPressed}>
              <Text>Record new audio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const PersonalAudioContainer = connect(
  null,
  mapDispatchToProps,
)(PersonalAudioContainerComponent);

const personalAudioContainerStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  iconContainer: {alignSelf: 'center'},
  formButton: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
