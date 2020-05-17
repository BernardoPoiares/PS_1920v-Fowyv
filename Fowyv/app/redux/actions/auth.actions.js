import {fetchApi} from '../../service/api';

export const loginUser = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'AUTHENTICATE_USER_LOADING'});
      const response = await fetchApi('/user/login', 'POST', payload, 200);

      if (response.success) {
        dispatch({type: 'AUTHENTICATE_USER_SUCCESS', token: response.token});
        dispatch({type: 'GET_USER_SUCCESS', payload: response.token});
      } else {
        throw response;
      }
    } catch (ex) {
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
      const response = await fetchApi('/user/logout', 'POST', null, 200, token);
      console.log(response);
      if (response.success) {
        dispatch({type: 'LOGOUT_USER_SUCCESS'});
      } else {
        throw response;
      }
    } catch (ex) {
      
      console.log(ex);
      dispatch({type: 'LOGOUT_USER_FAIL', payload: ex.responseBody});
    }
  };
};
