const BASE_URL = 'http://192.168.1.131:4000';

import SocketIOClient from 'socket.io-client';

export const createWebSocketClient = dispatcher => {
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
};

export const sendMessage = (socket, token, message) => {
  socket.emit('userMessage', JSON.stringify({message: message}));
};
