import {combineReducers} from 'redux';

const getUser = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        userDetails: null,
      };
    case 'GET_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        userDetails: action.payload,
      };
    case 'GET_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        userDetails: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  getUser,
});
