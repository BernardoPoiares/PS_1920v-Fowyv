import {combineReducers} from 'redux';

import globalReducer from './global.reducer.js';
import authReducer from './auth.reducer.js';
import userReducer from './user.reducer.js';
import searchSettingsReducer from './searchSettings.reducer.js';
import userFunctionalities from './userFunctionalities.reducer.js';
import userMatches from './userMatchesReducer.js';
import messagesReducer from './messages.reducer.js';

const reducers = {
  authReducer,
  userReducer,
  searchSettingsReducer,
  userFunctionalities,
  userMatches,
  messagesReducer,
  globalReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER_SUCCESS') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
