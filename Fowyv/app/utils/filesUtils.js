import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

export const writeFile = (filename, content) => {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  const path = RNFS.ExternalDirectoryPath + '/' + filename;

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

export const readFile = (filename, content) => {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  const path = RNFS.DocumentDirectoryPath + filename;

  const base64 = Buffer.from(content, 'utf-8').toString('base64');

  RNFS.createFile(path, base64, 'base64')
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
};
