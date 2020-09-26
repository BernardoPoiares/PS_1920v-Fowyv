import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {AudioUtils} from 'react-native-audio';

import {sendAudioMessageRequest} from './../redux/actions/messages.actions';
export const getFilesDir = () => {
  return RNFS.DocumentDirectoryPath;
};

export const writeFile = async (filename, content) => {
  const path = AudioUtils.DocumentDirectoryPath + '/' + filename;

  const base64 = Buffer.from(content).toString('base64');

  return await RNFS.writeFile(path, base64, 'base64');
};

export const readAudioFile = async filepath => {
  return RNFS.readFile(getAudioFilePath(filepath), 'base64');
};

export const getAudioFilePath = filename => {
  return AudioUtils.DocumentDirectoryPath + '/' + filename;
};

export const getLocalAudioFilePath = async (filename, promiseRequest) => {
  const audioPath = getAudioFilePath(filename);
  if (!(await RNFS.exists(audioPath))) {
    return await promiseRequest().then(success => (success ? audioPath : null));
  } else {
    return audioPath;
  }
};

export const requestAudioFile = async (filename, dispatch) => {
  const fileExists = await RNFS.exists(getAudioFilePath(filename));
  if (!fileExists) {
    dispatch(
      sendAudioMessageRequest({
        fileID: filename,
      }),
    );
  }
};
