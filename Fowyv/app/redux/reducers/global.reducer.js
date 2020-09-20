import {combineReducers} from 'redux';

const globalState = (state = {}, action) => {
  switch (action.type) {
    case 'GLOBAL_STATE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'GLOBAL_STATE_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'GLOBAL_STATE_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GLOBAL_STATE_CLEAR_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default combineReducers({globalState});
