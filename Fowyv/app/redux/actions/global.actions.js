export const clearError = () => {
  return async dispatch => {
    dispatch({type: 'GLOBAL_STATE_CLEAR_ERROR'});
  };
};

export const setError = payload => {
  return dispatch => {
    dispatch({type: 'GLOBAL_STATE_ERROR', payload: payload});
  };
};
