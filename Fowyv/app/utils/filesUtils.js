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

export const readAudioFile = (filepath, cb) => {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

  return RNFS.readFile(filepath, 'base64')
    .then(result => {
      console.log('GOT RESULT', result);
      cb(result);
    })
    .catch(err => {
      console.log(err);
    });
};

export const checkAudioFile = (filename, dispatch) => {
  const path = AudioUtils.DocumentDirectoryPath + '/' + filename;
  dispatch(
    sendAudioMessageRequest({
      fileID: filename,
    }),
  );
  return true;
};

export const getAudioFilePath = filename => {
  const path = AudioUtils.DocumentDirectoryPath + '/' + filename;
  if (RNFS.exists(path)) {
    return path;
  }
  return null;
};
