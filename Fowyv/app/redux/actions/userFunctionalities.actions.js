import {fetchApi} from '../../service/api';

export const searchUsers = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_SEARCH_USERS_LOADING'});
      const response = await fetchApi(
        '/api/search/users',
        'GET',
        null,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'GET_SEARCH_USERS_SUCCESS',
          payload: response.responseBody,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'GET_SEARCH_USERS_FAIL', payload: ex.responseBody});
    }
  };
};

export const likeUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'SET_SEARCH_SETTINGS_LOADING'});
      const response = await fetchApi(
        '/api/user/settings',
        'POST',
        payload.settings,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'SET_SEARCH_SETTINGS_SUCCESS',
          payload: payload.settings,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'SET_SEARCH_SETTINGS_FAIL', payload: ex.responseBody});
    }
  };
};

export const dislikeUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'SET_SEARCH_SETTINGS_LOADING'});
      const response = await fetchApi(
        '/api/search/settings',
        'POST',
        payload.settings,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'SET_SEARCH_SETTINGS_SUCCESS',
          payload: payload.settings,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'SET_SEARCH_SETTINGS_FAIL', payload: ex.responseBody});
    }
  };
};
