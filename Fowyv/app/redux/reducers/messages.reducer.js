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
      };
    case 'USER_MESSAGES_GET_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        matches: action.payload,
      };
    case 'USER_MESSAGES_GET_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        matches: state.matches,
      };
    default:
      return state;
  }
};

export default combineReducers({userMessages});
