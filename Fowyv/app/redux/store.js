import AsyncStorage from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persit';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware());
  let persistor = persistStore(store);
  return {store, persistor};
};
