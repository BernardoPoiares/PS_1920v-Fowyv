import {combineReducers} from 'redux';

import authReducer from './auth.reducer.js';
import userReducer from './user.reducer.js';
import searchSettingsReducer from './searchSettings.reducer.js';
import userFunctionalities from './userFunctionalities.reducer.js';

const reducers = {
  authReducer,
  userReducer,
  searchSettingsReducer,
  userFunctionalities,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER_SUCCESS') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
