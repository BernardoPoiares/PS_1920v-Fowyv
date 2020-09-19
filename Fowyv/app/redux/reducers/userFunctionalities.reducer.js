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
        match: null,
      };
    case 'GET_SEARCH_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
        match: null,
      };
    case 'GET_SEARCH_USERS_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        match: null,
      };
    case 'LIKED_USER_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        match: null,
      };
    case 'LIKED_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload.users,
        match: action.payload.match,
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
        match: null,
      };
    case 'DISLIKED_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
        match: null,
      };
    case 'DISLIKED_USER_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        match: null,
      };
    case 'CLEAR_MATCH':
      return {
        ...state,
        match: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchUsers,
});
