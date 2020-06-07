import {fetchApi} from '../../service/api';

export const getSearchSettings = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_SEARCH_SETTINGS_LOADING'});
      const response = await fetchApi(
        '/api/search/settings',
        'GET',
        null,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'GET_SEARCH_SETTINGS_SUCCESS',
          payload: {
            genders: response.responseBody.searchGenders,
            maxAge: response.responseBody.maxSearchAge,
            minAge: response.responseBody.minSearchAge,
          },
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'GET_SEARCH_SETTINGS_FAIL', payload: ex.responseBody});
    }
  };
};

export const setSearchSettings = payload => {
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

export const createUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'AUTHENTICATE_USER_LOADING'});
      const response = await fetchApi('/api/auth/signup', 'POST', payload, 200);
      if (response.success) {
        dispatch({
          type: 'AUTHENTICATE_USER_SUCCESS',
          token: response.responseBody.token,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'AUTHENTICATE_USER_FAIL', payload: ex.responseBody});
    }
  };
};
