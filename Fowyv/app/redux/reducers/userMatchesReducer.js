import {combineReducers} from 'redux';

const userMatches = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_MATCHES_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        users: state.users,
      };
    case 'GET_USER_MATCHES_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
      };
    case 'GET_USER_MATCHES_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        users: state.users,
      };
    default:
      return state;
  }
};

export default combineReducers({
  userMatches,
});
