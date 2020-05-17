import {combineReducers} from 'redux';

const authenticateUser = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        token: null,
        isLoggedIn: false,
      };
    case 'AUTHENTICATE_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        token: action.token,
        isLoggedIn: true,
      };
    case 'AUTHENTICATE_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        token: null,
        isLoggedIn: false,
      };
    case 'LOGOUT_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        token: state.token,
        isLoggedIn: true,
      };
    case 'LOGOUT_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        token: null,
        isLoggedIn: false,
      };
    case 'LOGOUT_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        token: state.token,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default combineReducers({authenticateUser});
