import {
  createWebSocketClient,
  sendMessage,
  sendGetAudioMessageRequest,
  sendAudioMessage,
} from '../../service/websocketsevents';
import uuid from 'react-native-uuid';

export const initialize = () => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'USER_MESSAGES_CONNECTION_LOADING'});
      const socket = createWebSocketClient(dispatch, token);
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
        new Date().toLocaleString('en-GB'),
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
        date: new Date().toLocaleString('en-GB'),
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
        new Date().toLocaleString('en-GB'),
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
        date: new Date().toLocaleString('en-GB'),
        content: filename,
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
        payload.date,
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

export const newMatch = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {matches},
        },
      } = state;

      matches.push(payload);

      dispatch({type: 'USER_MESSAGES_NEW_MATCH', payload: matches});
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
  date,
  message,
  state,
  userToSend,
) => {
  if (matches && matches.length > 0) {
    const msg = {
      id: transId,
      user: user,
      type: type,
      date: date,
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
