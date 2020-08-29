const BASE_URL = 'http://192.168.1.131:4000';

import io from 'socket.io-client';

import {writeFile, readAudioFile} from '../utils/filesUtils';

export const createWebSocketClient = (dispatcher, token) => {
  try {
    var socket = io(BASE_URL, {
      query: 'token=' + token,
      forceNew: true,
    });
    subscribeEvents(socket, dispatcher);
    return socket;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const subscribeEvents = (socket, dispatcher) => {
  socket.on('messageReceived', messages => {
    console.log(messages);
  });

  socket.on('receiveAllMessages', messages => {
    const msgs = JSON.parse(messages);
    console.log(msgs);
    dispatcher({
      type: 'USER_MESSAGES_GET_SUCCESS',
      payload: msgs,
    });
  });

  socket.on('messageReceived', message => {
    console.log(message);
  });

  socket.on('audioMessageReceived', resp => {
    try {
      console.log('audioMessageReceived');
      const fileResponse = JSON.parse(resp);
      writeFile(fileResponse.filename, fileResponse.content);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('audioUploaded', resp => {
    try {
      const fileResponse = JSON.parse(resp);
      console.log('fileUploaded ' + fileResponse.filename);
      dispatcher({
        type: 'USER_MESSAGES_SENDAUDIO_SUCCESS',
        payload: fileResponse,
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export const sendMessage = (socket, message) => {
  socket.emit('userMessage', JSON.stringify({message: message}));
};

export const sendGetAudioMessageRequest = async (socket, id) => {
  return await new Promise(resolve => {
    socket.emit(
      'getAudioMessage',
      JSON.stringify({fileID: id}),
      (error, resp) => resolve({error: error, resp: resp}),
    );
  });
};

export const sendAudioMessage = (socket, message) => {
  readAudioFile(message.content, data => {
    //const dataBuffer = Buffer.from(data).toString('base64');
    socket.emit(
      'userAudioMessage',
      JSON.stringify({message: message, content: data}),
    );
  });
};
