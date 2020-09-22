import {fetchApi} from '../../service/api';
import {writeFile, readAudioFile} from '../../utils/filesUtils';

export const saveUserDetails = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'GLOBAL_STATE_LOADING'});
      const {audioFile, ...details} = payload;
      const audioFileData = await readAudioFile(audioFile);
      if (audioFileData) {
        const response = await fetchApi(
          '/api/user/profile',
          'POST',
          {
            fileType: audioFile.replace(/^.*[\\\/]/, '').split('.')[1],
            content: audioFileData,
            ...details,
          },
          200,
          token,
        );

        if (response.success) {
          dispatch({
            type: 'GET_USER_SUCCESS',
            payload: {audioFile: response.responseBody.audioFile, ...details},
          });
          dispatch({
            type: 'GLOBAL_STATE_CLEAR_LOADING',
          });
        } else {
          dispatch({
            type: 'GLOBAL_STATE_ERROR',
            payload: response.responseBody,
          });
        }
      } else {
        throw new Error('Error Getting AudioFile');
      }
    } catch (ex) {
      dispatch({
        type: 'GLOBAL_STATE_ERROR',
        payload: ex,
      });
    }
  };
};

export const getUserDetails = payload => {
  return async dispatch => {
    try {
      dispatch({type: 'GET_USER_LOADING'});
      const response = await fetchApi(
        '/api/user/details',
        'GET',
        null,
        200,
        payload.token,
      );

      if (response.success) {
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: response.responseBody,
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

export const getUserPersonalAudio = payload => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const {
        authReducer: {
          authenticateUser: {token},
        },
      } = state;
      dispatch({type: 'GET_USER_PERSONALAUDIO_LOADING'});
      const response = await fetchApi(
        '/api/user/personalAudio?audioFile=' + payload.audioFile,
        'GET',
        null,
        200,
        token,
      );

      if (response.success) {
        const ret = await writeFile(
          payload.audioFile,
          response.responseBody.content,
        );
        dispatch({type: 'GET_USER_PERSONALAUDIO_SUCCESS'});
        return true;
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
    return false;
  };
};
