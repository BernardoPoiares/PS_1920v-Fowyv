const BASE_URL = 'http://192.168.1.173:4000';
//const BASE_URL = 'https://fowyv-backend.azurewebsites.net';

import io from 'socket.io-client';

import {writeFile, readAudioFile} from '../utils/filesUtils';

import {
  receiveMessage,
  sendAudioMessageRequest,
} from '../redux/actions/messages.actions';

export const createWebSocketClient = (dispatcher, token) => {
  try {
    var socket = io(BASE_URL, {
      query: 'token=' + token,
      forceNew: true,
    });
    subscribeEvents(socket, dispatcher);
    return socket;
  } catch (ex) {
    dispatcher({
      type: 'GLOBAL_STATE_ERROR',
      payload: ex,
    });
  }
};

const subscribeEvents = (socket, dispatcher) => {
  socket.on('messageReceived', messages => {
    console.log(messages);
  });

  socket.on('userMatches', messages => {
    const msgs = JSON.parse(messages);
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

  socket.on('receiveMessage', message => {
    try {
      console.log('receivedMessage ' + message);
      if (message.type) {
        if (message.type === 'AUDIO') {
          dispatcher(
            sendAudioMessageRequest({
              fileID: message.content,
            }),
          );
        }
        dispatcher(receiveMessage(message));
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export const sendMessage = (socket, message) => {
  socket.emit('userMessage', JSON.stringify({message: message}));
};

export const sendGetAudioMessageRequest = (socket, id) => {
  socket.emit('getAudioMessage', JSON.stringify({fileID: id}));
};

export const sendAudioMessage = async (socket, message) => {
  const data = await readAudioFile(message.content);
  if (data) {
    socket.emit(
      'userAudioMessage',
      JSON.stringify({message: message, content: data}),
    );
  }
};
