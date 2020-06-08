import {combineReducers} from 'redux';

const searchUsers = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SEARCH_USERS_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        users: state.users,
      };
    case 'GET_SEARCH_USERS_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
      };
    case 'GET_SEARCH_USERS_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        users: state.users,
      };
    case 'LIKED_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        users: state.users,
      };
    case 'LIKED_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
      };
    case 'LIKED_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        users: state.users,
      };
    case 'DISLIKED_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        users: state.users,
      };
    case 'DISLIKED_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
      };
    case 'DISLIKED_USER_FAIL':
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
  searchUsers,
});
