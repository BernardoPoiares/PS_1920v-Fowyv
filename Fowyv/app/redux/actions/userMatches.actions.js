import {fetchApi} from '../../service/api';

export const searchUserMatches = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_USER_MATCHES_LOADING'});
      const response = await fetchApi(
        '/api/user/matches',
        'GET',
        null,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'GET_USER_MATCHES_SUCCESS',
          payload: response.responseBody,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'GET_USER_MATCHES_FAIL', payload: ex.responseBody});
    }
  };
};
