import {
  createWebSocketClient,
  sendMessage,
  downloadFileRequest,
} from '../../service/websocketsevents';
import uuid from 'react-native-uuid';

export const initialize = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'USER_MESSAGES_CONNECTION_LOADING'});
      const socket = createWebSocketClient(dispatch, payload);
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
        authReducer: {
          authenticateUser: {userEmail},
        },
      } = state;
      const transID = uuid.v4();
      const msgAdded = addMessageToConversation(
        matches,
        userEmail,
        transID,
        'TEXT',
        payload.message,
      );

      if (!msgAdded) {
        throw Error('message not added');
      }

      dispatch({type: 'USER_MESSAGES_SEND_LOADING', payload: matches});

      sendMessage(connection, {
        id: transID,
        user: payload.userEmail,
        type: 'TEXT',
        date: '15-08-2020',
        content: payload.message,
        state: 'sended',
      });

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

export const downloadFileRequest = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {connection},
        },
      } = state;

      dispatch({type: 'USER_MESSAGES_GETFILE_LOADING'});

      sendFileRequest(connection, payload.file);

      dispatch({type: 'USER_MESSAGES_GETFILE_SUCCESS'});
    } catch (ex) {
      console.log(ex);
      dispatch({
        type: 'USER_MESSAGES_GETFILE_FAIL',
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
      return true;
    }
    return false;
  } else {
    throw new Error('Matches are empty');
  }
};
