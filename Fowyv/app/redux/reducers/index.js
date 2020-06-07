import {combineReducers} from 'redux';

import authReducer from './auth.reducer.js';
import userReducer from './user.reducer.js';
import searchSettingsReducer from './searchSettings.reducer.js';

const reducers = {
  authReducer,
  userReducer,
  searchSettingsReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER_SUCCESS') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
