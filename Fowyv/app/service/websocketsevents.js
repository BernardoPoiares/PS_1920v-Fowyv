const BASE_URL = 'http://192.168.1.131:4000';

import io from 'socket.io-client';

import {writeFile} from '../utils/filesUtils';

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

  socket.on('fileFound', async resp => {
    console.log(resp);
    const fileResponse = JSON.parse(resp);
    await writeFile(fileResponse.id, fileResponse.content);
  });
};

export const sendMessage = (socket, message) => {
  socket.emit('userMessage', JSON.stringify({message: message}));
};

export const downloadFileRequest = (socket, fileID) => {
  socket.emit('getFile', JSON.stringify({id: fileID}));
};
