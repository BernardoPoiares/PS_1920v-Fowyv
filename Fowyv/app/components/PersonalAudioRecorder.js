import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AudioUtils} from 'react-native-audio';
import uuid from 'react-native-uuid';

import {AudioRecorder} from '../utils/AudioRecorder.js';
import {AudioPlayer} from '../utils/AudioPlayer.js';

export class PersonalAudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPath: null,
      hasAudio: false,
      sound: null,
      isPlaying: false,
      isRecording: false,
      recorder: new AudioRecorder(
        AudioUtils.DocumentDirectoryPath + '/' + uuid.v4() + '.aac',
      ),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.modalVisible && !this.state.recorder) {
      this.clearState();
      this.setState({
        recorder: new AudioRecorder(
          AudioUtils.DocumentDirectoryPath + '/' + uuid.v4() + '.aac',
        ),
      });
    }
    return true;
  }

  onErasePressed = () => {
    this.clearState();
    this.setState({
      recorder: new AudioRecorder(
        AudioUtils.DocumentDirectoryPath + '/' + uuid.v4() + '.aac',
      ),
    });
  };

  setSound = sound => {
    this.setState({hasAudio: true, sound: sound});
  };

  finishedRecording = async audioPath => {
    this.setState({audioPath: audioPath});
    AudioPlayer.createSound(audioPath, this.setSound);
  };

  hideAudioRecorder = () => {
    return this.state.hasAudio;
  };

  hideAudioPlayer = () => {
    return !this.state.hasAudio;
  };

  chooseAudioIcon = () => {
    return !this.state.isPlaying ? 'md-play-circle' : 'md-pause';
  };

  chooseAudioRecorderIcon = () => {
    return this.state.isRecording ? 'ios-square' : 'md-microphone';
  };

  audioPlayingEnded = () => {
    this.setState({isPlaying: false});
  };

  onAudioRecorderIconPressed = () => {
    if (this.state.recorder.isRecording) {
      this.state.recorder.stopRecording().then(audioPath => {
        this.finishedRecording(audioPath);
        this.setState({isRecording: false});
      });
    } else {
      this.state.recorder.startRecording();
      this.setState({isRecording: true});
    }
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
  onBackPressed = () => {
    this.clearState();
    this.props.goBack();
  };

  onSavePressed = () => {
    this.props.audioFileRecorded(this.state.audioPath.replace(/^.*[\\\/]/, ''));
    this.setState({
      recorder: new AudioRecorder(
        AudioUtils.DocumentDirectoryPath + '/' + uuid.v4() + '.aac',
      ),
    }),
      this.clearState();
    this.props.goBack();
  };

  componentWillUnmount() {
    this.clearState();
  }
  clearState = () => {
    if (this.state.sound) {
      this.state.sound.release();
    }
    this.setState({
      audioPath: null,
      hasAudio: false,
      sound: null,
      isPlaying: false,
      isRecording: false,
      recorder: null,
    });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View style={personalAudioRecorderStyle.view}>
          <View style={personalAudioRecorderStyle.container}>
            <Text style={personalAudioRecorderStyle.containerHeader}>
              Record Audio
            </Text>
            <View style={personalAudioRecorderStyle.recorderContainer}>
              <View style={personalAudioRecorderStyle.recorderSemiContainer}>
                {/*<AudioRecorder
                  audioPath={this.state.audioPath}
                  finishedRecording={this.finishedRecording}
                  hide={this.hideAudioRecorder()}
                />*/}
                {!this.hideAudioPlayer() ? (
                  <TouchableOpacity
                    style={{alignSelf: 'center'}}
                    onPress={this.onAudioIconPressed}>
                    <Icon
                      name={this.chooseAudioIcon()}
                      size={80}
                      color="darkorange"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{alignSelf: 'center'}}
                    onPress={this.onAudioRecorderIconPressed}>
                    <Icon
                      name={this.chooseAudioRecorderIcon()}
                      size={80}
                      color="darkorange"
                      style={this.props.iconStyle}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={personalAudioRecorderStyle.eraseButton}
                  onPress={this.onErasePressed}>
                  <Text>Erase</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={personalAudioRecorderStyle.buttonsContainer}>
              <TouchableOpacity
                style={personalAudioRecorderStyle.bottomButton}
                onPress={this.onBackPressed}>
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={personalAudioRecorderStyle.bottomButton}
                onPress={this.onSavePressed}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const personalAudioRecorderStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerHeader: {
    backgroundColor: 'white',
  },
  recorderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  recorderSemiContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  iconContainer: {alignSelf: 'center'},
  eraseButton: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'moccasin',
  },
  bottomButton: {
    borderWidth: 1,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b608a',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: '#fff',
  },
  button: {
    padding: 20,
  },
  disabledButtonText: {
    color: '#eee',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00',
  },
});
