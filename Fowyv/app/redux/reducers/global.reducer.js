import {combineReducers} from 'redux';

const globalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GLOBAL_STATE_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'GLOBAL_STATE_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default combineReducers({globalReducer});
