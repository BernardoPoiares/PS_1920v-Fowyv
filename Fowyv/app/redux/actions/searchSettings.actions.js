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
            searchGenders: response.responseBody.searchGenders,
            maxSearchAge: response.responseBody.maxSearchAge,
            minSearchAge: response.responseBody.minSearchAge,
            languages: response.responseBody.languages,
          },
        });
      } else {
        dispatch({
          type: 'GLOBAL_STATE_ERROR',
          payload: response.responseBody,
        });
      }
    } catch (ex) {
      dispatch({
        type: 'GLOBAL_STATE_ERROR',
        payload: ex,
      });
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
        dispatch({
          type: 'GLOBAL_STATE_ERROR',
          payload: response.responseBody,
        });
      }
    } catch (ex) {
      dispatch({
        type: 'GLOBAL_STATE_ERROR',
        payload: ex,
      });
    }
  };
};
