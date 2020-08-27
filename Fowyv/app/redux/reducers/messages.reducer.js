import {combineReducers} from 'redux';

const userMessages = (state = {}, action) => {
  switch (action.type) {
    case 'USER_MESSAGES_CONNECTION_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        matches: state.matches,
        connection: null,
      };
    case 'USER_MESSAGES_CONNECTION_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        matches: state.matches,
        connection: action.payload,
      };
    case 'USER_MESSAGES_CONNECTION_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        matches: state.matches,
        connection: state.connection,
      };
    case 'USER_MESSAGES_GET_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        matches: state.matches,
        connection: state.connection,
      };
    case 'USER_MESSAGES_GET_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        matches: action.payload,
        connection: state.connection,
      };
    case 'USER_MESSAGES_GET_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        matches: state.matches,
        connection: state.connection,
      };
    case 'USER_MESSAGES_SEND_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        matches: action.payload,
        connection: state.connection,
      };
    case 'USER_MESSAGES_SEND_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        matches: state.matches,
        connection: state.connection,
      };
    case 'USER_MESSAGES_SEND_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        matches: state.matches,
        connection: state.connection,
      };
    case 'USER_MESSAGES_SENDAUDIO_LOADING': {
      const fileid = action.payload;
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        matches: state.matches,
        connection: state.connection,
      };
    }
    case 'USER_MESSAGES_SENDAUDIO_SUCCESS': {
      const fileid = action.payload;
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        matches: state.matches,
        connection: state.connection,
      };
    }
    case 'USER_MESSAGES_SENDAUDIO_FAIL': {
      const fileid = action.payload;
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        matches: state.matches,
        connection: state.connection,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({userMessages});
