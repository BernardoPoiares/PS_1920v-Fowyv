import {combineReducers} from 'redux';

const userMatches = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_MATCHES_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'GET_USER_MATCHES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: action.payload,
      };
    case 'GET_USER_MATCHES_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case 'DELETE_USER_MATCHES_LOADING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: action.payload,
      };
    }
    case 'DELETE_USER_MATCHES_SUCCESS': {
      const matches = state.users.filter(
        match =>
          match.emails.includes(action.payload.user) &&
          match.emails.includes(action.payload.matchUser),
      );
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        users: matches,
      };
    }
    case 'DELETE_USER_MATCHES_FAIL': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  userMatches,
});
