import {fetchApi} from '../../service/api';

export const searchUsers = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_SEARCH_USERS_LOADING'});
      const response = await fetchApi(
        '/api/search/users',
        'GET',
        null,
        200,
        payload.token,
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
      dispatch({type: 'LIKED_USER_LOADING'});
      const response = await fetchApi(
        '/api/interaction/like',
        'POST',
        {email: payload.user},
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'LIKED_USER_SUCCESS',
          payload: state.userFunctionalities.searchUsers.users.slice(1),
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
      dispatch({type: 'DISLIKED_USER_LOADING'});
      const response = await fetchApi(
        '/api/interaction/dislike',
        'POST',
        {email: payload.user},
        200,
        payload.token,
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
