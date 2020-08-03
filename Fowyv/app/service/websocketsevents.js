const BASE_URL = 'http://192.168.1.131:4000';

import SocketIOClient from 'socket.io-client';

export const createWebSocketClient = async () => {
  try {
    var socket = SocketIOClient(BASE_URL);
    socket.on('message', messages => {
      console.log(messages);
    });
    return socket;
  } catch (ex) {
    console.log(ex);
  }
};
