import {fetchApi} from '../../service/api';
import {getUserDetails} from './user.actions';
import {initialize} from './messages.actions';

export const loginUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GLOBAL_STATE_LOADING'});
      const response = await fetchApi('/api/auth/signin', 'POST', payload, 200);

      if (response.success) {
        dispatch(getUserDetails({token: response.responseBody.token})).then(
          dispatch(initialize(response.responseBody.token)).then(() => {
            dispatch({
              type: 'AUTHENTICATE_USER_SUCCESS',
              email: payload.email,
              token: response.responseBody.token,
            });
            dispatch({type: 'GLOBAL_STATE_CLEAR_LOADING'});
          }),
        );
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

export const logoutUser = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'LOGOUT_USER_LOADING'});
      dispatch({type: 'LOGOUT_USER_SUCCESS'});
    } catch (ex) {
      dispatch({type: 'LOGOUT_USER_FAIL', payload: ex.responseBody});
    }
  };
};

export const createUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GLOBAL_STATE_LOADING'});
      const response = await fetchApi('/api/auth/signup', 'POST', payload, 200);
      if (response.success) {
        dispatch({
          type: 'AUTHENTICATE_USER_SUCCESS',
          token: response.responseBody.token,
        });
        dispatch({type: 'GLOBAL_STATE_CLEAR_LOADING'});
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
