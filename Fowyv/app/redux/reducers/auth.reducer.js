import {combineReducers} from 'redux';

const authenticateUser = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        token: null,
        isLoggedIn: false,
      };
    case 'AUTHENTICATE_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        token: action.token,
        email: action.email,
        isLoggedIn: true,
      };
    case 'AUTHENTICATE_USER_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        token: null,
        isLoggedIn: false,
      };
    case 'LOGOUT_USER_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: true,
      };
    case 'LOGOUT_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        token: null,
        isLoggedIn: false,
      };
    case 'LOGOUT_USER_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default combineReducers({authenticateUser});
