import React from 'react';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AudioRecorder as recorder, AudioUtils} from 'react-native-audio';
import uuid from 'react-native-uuid';

export class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      currentTime: 0.0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      hasPermission: undefined,
    };
  }
  componentDidMount() {
    recorder.requestAuthorization().then(isAuthorised => {
      this.setState({hasPermission: isAuthorised});

      if (!isAuthorised) {
        return;
      }
      recorder.onProgress = data => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      recorder.onFinished = data => {};
    });
  }

  prepareRecordingPath() {
    const audioPath =
      AudioUtils.DocumentDirectoryPath + '/' + uuid.v4() + '.aac';
    recorder
      .prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        IncludeBase64: true,
      })
      .then(a => {})
      .catch(c => {});
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await recorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {}
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await recorder.resumeRecording();
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
      const filePath = await recorder.stopRecording();

      this._finishRecording(true, filePath);
      return filePath;
    } catch (error) {
      console.error(error);
    }
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
    this.prepareRecordingPath();

    try {
      const filePath = await recorder.startRecording();
      this.setState({isRecording: true, recording: true, paused: false});
      console.log(filePath);
    } catch (ex) {
      console.log(ex);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({
      isRecording: false,
      finished: didSucceed,
    });
    this.props.finishedRecording(filePath);
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`,
    );
  }

  chooseAudioIcon = () => {
    return this.state.isRecording ? 'ios-square' : 'md-microphone';
  };

  onAudioIconPressed = () => {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };

  render() {
    if (!this.props.hide) {
      return (
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={this.onAudioIconPressed}>
          <Icon
            name={this.chooseAudioIcon()}
            size={this.props.iconSize != null ? this.props.iconSize : 80}
            color={
              this.props.iconColor != null ? this.props.iconColor : 'darkorange'
            }
            style={this.props.iconStyle}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }
}
