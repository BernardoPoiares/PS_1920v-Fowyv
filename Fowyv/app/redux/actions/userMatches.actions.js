import {fetchApi} from '../../service/api';
import {logoutUser} from './auth.actions';

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
        if (response.status === 401) {
          dispatch(logoutUser());
        } else {
          dispatch({
            type: 'GLOBAL_STATE_ERROR',
            payload: response.responseBody,
          });
        }
      }
    } catch (ex) {
      dispatch({
        type: 'GLOBAL_STATE_ERROR',
        payload: ex,
      });
    }
  };
};

export const deleteUserMatch = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {email, token},
        },
      } = state;
      dispatch({type: 'DELETE_USER_MATCH_LOADING'});
      const response = await fetchApi(
        '/api/user/match',
        'DELETE',
        {email: payload.userEmail},
        200,
        token,
      );
      if (response.success) {
        dispatch({
          type: 'DELETE_USER_MATCH_SUCCESS',
          payload: {user: email, matchUser: payload.userEmail},
        });
        return true;
      } else {
        if (response.status === 401) {
          dispatch(logoutUser());
        } else {
          dispatch({
            type: 'GLOBAL_STATE_ERROR',
            payload: response.responseBody,
          });
        }
      }
    } catch (ex) {
      dispatch({
        type: 'GLOBAL_STATE_ERROR',
        payload: ex,
      });
    }
  };
};
