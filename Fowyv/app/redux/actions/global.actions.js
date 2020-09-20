export const clearError = () => {
  return dispatch => {
    dispatch({type: 'GLOBAL_STATE_CLEAR_ERROR'});
  };
};
