import {combineReducers} from 'redux';

const searchUsers = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SEARCH_USERS_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'GET_SEARCH_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
      };
    case 'GET_SEARCH_USERS_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case 'LIKED_USER_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
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
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case 'DISLIKED_USER_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
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
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchUsers,
});
