import {fetchApi} from '../../service/api';
import {getUserDetails} from './user.actions';
import {initialize} from './messages.actions';

export const loginUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'AUTHENTICATE_USER_LOADING'});
      const response = await fetchApi('/api/auth/signin', 'POST', payload, 200);

      if (response.success) {
        dispatch(getUserDetails({token: response.responseBody.token})).then(
          dispatch(initialize(response.responseBody.token)).then(() => {
            dispatch({
              type: 'AUTHENTICATE_USER_SUCCESS',
              email: payload.email,
              token: response.responseBody.token,
            });
          }),
        );
      } else {
        throw response;
      }
    } catch (ex) {
      console.log(ex);
      dispatch({type: 'AUTHENTICATE_USER_FAIL', payload: ex.responseBody});
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
      const response = await fetchApi(
        '/api/auth/signout',
        'POST',
        null,
        200,
        token,
      );
      if (response.success) {
        dispatch({type: 'LOGOUT_USER_SUCCESS'});
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'LOGOUT_USER_FAIL', payload: ex.responseBody});
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
      console.log(ex);
      dispatch({type: 'AUTHENTICATE_USER_FAIL', payload: ex.responseBody});
    }
  };
};
