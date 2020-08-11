const BASE_URL = 'http://192.168.1.131:4000';

import SocketIOClient from 'socket.io-client';

export const createWebSocketClient = async dispatcher => {
  try {
    var socket = SocketIOClient(BASE_URL);
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
    dispatcher({
      type: 'USER_MESSAGES_GET_SUCCESS',
      payload: messages,
    });
    console.log(messages);
  });
};

export const sendMessage = async (socket, message, token = null) => {
  socket.emit('sendMessage', JSON.stringify({message: message}));
};
