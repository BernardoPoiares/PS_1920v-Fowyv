import {fetchApi} from '../../service/api';

export const searchUsers = () => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'GET_SEARCH_USERS_LOADING'});
      const response = await fetchApi(
        '/api/search/users',
        'GET',
        null,
        200,
        token,
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

export const likedUser = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'LIKED_USER_LOADING'});
      const response = await fetchApi(
        '/api/interaction/like',
        'POST',
        {email: payload.user},
        200,
        token,
      );

      if (response.success) {
        let match = null;
        if (response.responseBody && response.responseBody.match) {
          match = {email: payload.user, userName: payload.userName};
        }
        dispatch({
          type: 'LIKED_USER_SUCCESS',
          payload: {
            users: state.userFunctionalities.searchUsers.users.slice(1),
            match: match,
          },
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'LIKED_USER_FAIL', payload: ex.responseBody});
    }
  };
};

export const dislikedUser = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'DISLIKED_USER_LOADING'});
      const response = await fetchApi(
        '/api/interaction/dislike',
        'POST',
        {email: payload.user},
        200,
        token,
      );

      if (response.success) {
        dispatch({
          type: 'DISLIKED_USER_SUCCESS',
          payload: state.userFunctionalities.searchUsers.users.slice(1),
        });
      } else {
        throw response;
      }
    } catch (ex) {
      dispatch({type: 'DISLIKED_USER_FAIL', payload: ex.responseBody});
    }
  };
};

export const clearMatch = () => {
  return async dispatch => {
    dispatch({type: 'CLEAR_MATCH'});
  };
};
