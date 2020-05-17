import {combineReducers} from 'redux';

import authReducer from './auth.reducer.js';
import userReducer from './user.reducer.js';

const reducers = {
  authReducer,
  userReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER_SUCCESS') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
