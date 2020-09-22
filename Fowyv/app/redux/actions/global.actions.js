export const clearError = () => {
  return async dispatch => {
    dispatch({type: 'GLOBAL_STATE_CLEAR_ERROR'});
  };
};
