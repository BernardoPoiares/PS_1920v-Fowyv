import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {AudioUtils} from 'react-native-audio';

import {sendAudioMessageRequest} from './../redux/actions/messages.actions';
export const getFilesDir = () => {
  return RNFS.DocumentDirectoryPath;
};

export const writeFile = (filename, content) => {
  const path = AudioUtils.DocumentDirectoryPath + '/' + filename;

  const base64 = Buffer.from(content).toString('base64');

  RNFS.writeFile(path, base64, 'base64')
    .then(success => {
      console.log(success);
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err);
    });
};

export const readAudioFile = async (filepath, cb) => {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

  return await RNFS.readFile(filepath, 'base64');
};

export const checkAudioFile = async (filename, dispatch) => {
  const path = AudioUtils.DocumentDirectoryPath + '/' + filename;
  if (RNFS.exists(path)) {
    return true;
  }
  dispatch(
    sendAudioMessageRequest({
      fileID: filename,
    }),
  );
};

export const getAudioFilePath = filename => {
  const path = AudioUtils.DocumentDirectoryPath + '/' + filename;
  if (RNFS.exists(path)) {
    return path;
  }
  return null;
};
