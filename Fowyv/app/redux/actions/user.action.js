import {fetchApi} from '../../service/api';

export const saveUserDetails = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_USER_LOADING'});
      const response = await fetchApi(
        '/api/user/profile',
        'POST',
        payload.userDetails,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: payload.userDetails,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      console.log(ex);
      dispatch({type: 'GET_USER_FAIL', payload: ex.responseBody});
    }
  };
};

export const getUserDetails = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_USER_LOADING'});
      const response = await fetchApi(
        '/api/user/details',
        'GET',
        null,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: response.responseBody,
        });
      } else {
        throw response;
      }
    } catch (ex) {
      console.log(ex);
      dispatch({type: 'GET_USER_FAIL', payload: ex.responseBody});
    }
  };
};
