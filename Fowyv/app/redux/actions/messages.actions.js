import {
  createWebSocketClient,
  sendMessage,
} from '../../service/websocketsevents';
import uuid from 'react-native-uuid';

export const initialize = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'USER_MESSAGES_CONNECTION_LOADING'});
      const socket = createWebSocketClient(dispatch);
      dispatch({
        type: 'USER_MESSAGES_CONNECTION_SUCCESS',
        payload: socket,
      });
    } catch (ex) {
      dispatch({
        type: 'USER_MESSAGES_CONNECTION_FAIL',
        payload: ex.responseBody,
      });
    }
  };
};

export const sendTextMessage = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {connection, matches},
        },
      } = state;
      const transID = uuid.v4();
      const msg = addMessageToConversation(
        matches,
        payload.userEmail,
        transID,
        'TEXT',
        payload.message,
      );
      if (msg === null) {
        throw Error('message not added');
      }

      dispatch({type: 'USER_MESSAGES_SEND_LOADING', payload: matches});

      sendMessage(connection, payload.userEmail, msg);

      dispatch({
        type: 'USER_MESSAGES_SEND_SUCCESS',
      });
    } catch (ex) {
      console.log(ex);
      dispatch({
        type: 'USER_MESSAGES_SEND_FAIL',
        payload: ex.responseBody,
      });
    }
  };
};

const addMessageToConversation = (matches, user, transId, type, message) => {
  if (matches && matches.length > 0) {
    const msg = {
      id: transId,
      user: user,
      type: type,
      date: '15-08-2020',
      content: message,
      state: 'sended',
    };
    const match = matches.find(u => u.user == user);
    if (match) {
      match.messages.push(msg);
      return msg;
    }
  } else {
    throw new Error('Matches are empty');
  }
  return null;
};
