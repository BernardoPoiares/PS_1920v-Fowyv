import {fetchApi} from '../../service/api';
import {getUserDetails} from './user.actions';

export const loginUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GLOBAL_STATE_LOADING'});
      const response = await fetchApi('/api/auth/signin', 'POST', payload, 200);

      if (response.success) {
        dispatch({
          type: 'AUTHENTICATE_USER_SUCCESS',
          email: payload.email,
          token: response.responseBody.token,
        });
        dispatch(getUserDetails()).then(() => {
          dispatch({type: 'GLOBAL_STATE_CLEAR_LOADING'});
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

export const logoutUser = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        messagesReducer: {
          userMessages: {connection},
        },
      } = state;
      dispatch({type: 'LOGOUT_USER_LOADING'});
      dispatch({type: 'LOGOUT_USER_SUCCESS'});
      if (connection != null && connection !== undefined) {
        connection.close();
      }
    } catch (ex) {
      dispatch({type: 'LOGOUT_USER_FAIL', payload: ex.responseBody});
    }
  };
};

export const deleteUser = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'GLOBAL_STATE_LOADING'});
      const response = await fetchApi(
        '/api/auth/user',
        'DELETE',
        null,
        200,
        token,
      );
      if (response.success) {
        dispatch({type: 'GLOBAL_STATE_CLEAR_LOADING'});
        dispatch(logoutUser());
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

export const createAccount = payload => {
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
