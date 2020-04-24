import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-material-dropdown';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';

let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

const languages = [
  {
    value: 'English',
  },
  {
    value: 'Portuguese',
  },
];

export class PersonalAudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      hasAudio: false,
      currentTime: 0.0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
    };
  }
  componentDidMount() {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      this.setState({hasPermission: isAuthorised});

      if (!isAuthorised) {
        return;
      }
      AudioRecorder.onProgress = data => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = data => {};
    });
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    })
      .then(a => {
        console.log(a);
      })
      .catch(c => {
        console.log(c);
      });
  }
  async _pause() {
    if (!this.state.recording) {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  }

  async stopRecording() {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }

    this.setState({
      isRecording: false,
      stoppedRecording: true,
      recording: false,
      paused: false,
    });

    try {
      const filePath = await AudioRecorder.stopRecording();

      this._finishRecording(true, filePath);
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async playAudio() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
    });
  }

  async startRecording() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn("Can't record, no permission granted!");
      return;
    }
    this.prepareRecordingPath(this.state.audioPath);

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({isRecording: true, recording: true, paused: false});
    try {
      const filePath = await AudioRecorder.startRecording();
      console.log(filePath);
    } catch (ex) {
      console.log(ex);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({
      hasAudio: didSucceed,
      isRecording: false,
      finished: didSucceed,
    });
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`,
    );
  }

  chooseAudioIcon = () => {
    return this.state.hasAudio
      ? 'md-play-circle'
      : this.state.isRecording
      ? 'stop-circle'
      : 'md-microphone';
  };

  onAudioIconPressed = () => {
    if (this.state.hasAudio) {
      this.playAudio();
    } else if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };

  onErasePressed = () => {
    this.setState({hasAudio: false});
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
                <TouchableOpacity
                  style={personalAudioRecorderStyle.iconContainer}
                  onPress={this.onAudioIconPressed}>
                  <Icon
                    name={this.chooseAudioIcon()}
                    size={80}
                    color="darkorange"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={personalAudioRecorderStyle.eraseButton}
                  onPress={this.onErasePressed}>
                  <Text>Erase</Text>
                </TouchableOpacity>
              </View>
              <Dropdown
                label="language"
                containerStyle={personalAudioRecorderStyle.dropdown}
                data={languages}
              />
            </View>
            <View style={personalAudioRecorderStyle.buttonsContainer}>
              <TouchableOpacity
                style={personalAudioRecorderStyle.bottomButton}
                onPress={this.props.goBack}>
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={personalAudioRecorderStyle.bottomButton}>
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
  dropdown: {
    width: 120,
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
