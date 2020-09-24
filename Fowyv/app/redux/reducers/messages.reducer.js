import {combineReducers} from 'redux';

const userMessages = (state = {}, action) => {
  switch (action.type) {
    case 'USER_MESSAGES_CONNECTION_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        connection: null,
      };
    case 'USER_MESSAGES_CONNECTION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        connection: action.payload,
      };
    case 'USER_MESSAGES_CONNECTION_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case 'USER_MESSAGES_GET_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'USER_MESSAGES_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        matches: action.payload,
      };
    case 'USER_MESSAGES_GET_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case 'USER_MESSAGES_SENDAUDIO_LOADING':
    case 'USER_MESSAGES_RECEIVE_SUCCESS':
    case 'USER_MESSAGES_NEW_MATCH':
    case 'USER_MESSAGES_SEND_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        matches: action.payload,
      };
    case 'USER_MESSAGES_SEND_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case 'USER_MESSAGES_SEND_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case 'USER_MESSAGES_SENDAUDIO_SUCCESS': {
      const fileid = action.payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    }
    case 'USER_MESSAGES_SENDAUDIO_FAIL': {
      const fileid = action.payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({userMessages});
