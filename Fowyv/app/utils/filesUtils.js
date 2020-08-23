import RNFS from 'react-native-fs';

export const writeFile = async (filename, content) => {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  const path = RNFS.DocumentDirectoryPath + filename;

  // write the file
  await RNFS.writeFile(path, content, 'utf8');
};
