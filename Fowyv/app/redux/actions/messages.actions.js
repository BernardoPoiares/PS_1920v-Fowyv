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
      addMessageToConversation(
        matches,
        payload.userEmail,
        transID,
        'TEXT',
        payload.message,
      );
      dispatch({type: 'USER_MESSAGES_SEND_LOADING', payload: matches});

      sendMessage(connection, payload.user, payload.message);

      dispatch({
        type: 'USER_MESSAGES_SEND_SUCCESS',
      });
    } catch (ex) {
      dispatch({
        type: 'USER_MESSAGES_SEND_FAIL',
        payload: ex.responseBody,
      });
    }
  };
};

const addMessageToConversation = (matches, user, transId, type, message) => {
  if (matches && matches.length > 0) {
    matches
      .find(u => u.user === user)
      .messages.push({id: transId, messageType: type, message: message});
  } else {
    throw new Error('Matches are empty');
  }
};
