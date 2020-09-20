import {combineReducers} from 'redux';

const authenticateUser = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER_SUCCESS':
      return {
        ...state,
        isSuccess: true,
        token: action.token,
        email: action.email,
        isLoggedIn: true,
      };
    case 'LOGOUT_USER_SUCCESS':
      return {
        ...state,
        isSuccess: true,
        token: null,
        email: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default combineReducers({authenticateUser});
