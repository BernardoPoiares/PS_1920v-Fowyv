import React from 'react';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AudioRecorder as recorder} from 'react-native-audio';

export class AudioRecorder {
  constructor(audioPath) {
    (this.isRecording = false),
      (this.currentTime = 0.0),
      (this.recording = false),
      (this.paused = false),
      (this.stoppedRecording = false),
      (this.hasPermission = undefined),
      (this.audioPath = audioPath),
      recorder.requestAuthorization().then(isAuthorised => {
        this.hasPermission = isAuthorised;

        if (!isAuthorised) {
          return;
        }
        recorder.onProgress = data => {
          this.currentTime = data.currentTime;
        };

        recorder.onFinished = data => {};
      });
  }

  prepareRecordingPath(audioPath) {
    recorder
      .prepareRecordingAtPath(audioPath, {
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
    if (!this.recording) {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await recorder.pauseRecording();
      this.paused = true;
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.paused) {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await recorder.resumeRecording();
      this.paused = false;
    } catch (error) {
      console.error(error);
    }
  }

  async stopRecording() {
    if (!this.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }

    try {
      const filePath = await recorder.stopRecording();

      (this.isRecording = false),
        (this.stoppedRecording = true),
        (this.recording = false),
        (this.paused = false),
        this._finishRecording(true, filePath);
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async startRecording(recording, hasPermission, audioPath) {
    if (this.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.hasPermission) {
      console.warn("Can't record, no permission granted!");
      return;
    }
    this.prepareRecordingPath(this.audioPath);

    try {
      const filePath = await recorder.startRecording();
      (this.isRecording = true), (this.recording = true), (this.paused = false);
      console.log(filePath);
    } catch (ex) {
      console.log(ex);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    (this.isRecording = false),
      (this.finished = didSucceed),
      console.log(
        `Finished recording of duration ${
          this.currentTime
        } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`,
      );
  }

  chooseAudioIcon = () => {
    return this.isRecording ? 'ios-square' : 'md-microphone';
  };

  onAudioIconPressed = () => {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };
}
