import {
  createWebSocketClient,
  sendMessage,
  sendGetAudioMessageRequest,
  sendAudioMessage,
} from '../../service/websocketsevents';
import {writeFile} from '../../utils/filesUtils';
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
          authenticateUser: {email},
        },
      } = state;
      const transID = uuid.v4();
      const msgAdded = addMessageToConversation(
        matches,
        email,
        transID,
        'TEXT',
        payload.message,
        'sended',
        payload.userEmail,
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

export const sendAudioFile = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {connection, matches},
        },
        authReducer: {
          authenticateUser: {email},
        },
      } = state;
      const transID = uuid.v4();
      const filename = payload.audioPath.replace(/^.*[\\\/]/, '');

      const msgAdded = addMessageToConversation(
        matches,
        email,
        transID,
        'AUDIO',
        filename,
        'sended',
        payload.userEmail,
      );

      if (!msgAdded) {
        throw Error('message not added');
      }

      dispatch({type: 'USER_MESSAGES_SENDAUDIO_LOADING', payload: matches});

      await sendAudioMessage(connection, {
        id: transID,
        user: payload.userEmail,
        type: 'AUDIO',
        date: '15-08-2020',
        content: payload.audioPath,
        state: 'sended',
      });

      dispatch({type: 'USER_MESSAGES_SENDAUDIO_SUCCESS'});
    } catch (ex) {
      console.log(ex);
      dispatch({
        type: 'USER_MESSAGES_SENDAUDIO_FAIL',
        payload: ex.responseBody,
      });
    }
  };
};

export const sendAudioMessageRequest = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {connection},
        },
      } = state;

      dispatch({type: 'USER_MESSAGES_SENDAUDIOFILEREQUEST_LOADING'});

      sendGetAudioMessageRequest(connection, payload.fileID);

      dispatch({type: 'USER_MESSAGES_SENDAUDIOFILEREQUEST_SUCCESS'});
    } catch (ex) {
      console.log(ex);
      dispatch({
        type: 'USER_MESSAGES_SENDAUDIOFILEREQUEST_FAIL',
        payload: ex.responseBody,
      });
    }
  };
};

export const receiveMessage = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {matches},
        },
        authReducer: {
          authenticateUser: {email},
        },
      } = state;

      const msgAdded = addMessageToConversation(
        matches,
        payload.user,
        payload.id,
        payload.type,
        payload.content,
        payload.state,
        email,
      );

      if (!msgAdded) {
        throw Error('Message received error');
      }

      dispatch({type: 'USER_MESSAGES_RECEIVE_SUCCESS', payload: matches});
    } catch (ex) {
      console.log(ex);
      dispatch({
        type: 'USER_MESSAGES_SEND_FAIL',
        payload: ex.responseBody,
      });
    }
  };
};

const addMessageToConversation = (
  matches,
  user,
  transId,
  type,
  message,
  state,
  userToSend,
) => {
  if (matches && matches.length > 0) {
    const msg = {
      id: transId,
      user: user,
      type: type,
      date: '15-08-2020',
      content: message,
      state: state,
    };
    const match = matches.find(
      match => match.emails.includes(user) && match.emails.includes(userToSend),
    );
    if (match) {
      match.messages.push(msg);
      return true;
    }
    return false;
  } else {
    throw new Error('Matches are empty');
  }
};
