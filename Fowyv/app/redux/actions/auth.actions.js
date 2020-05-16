import {fetchApi} from '../../service/api';

export const loginUser = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi('/user/login', 'POST', payload, 200);
    } catch (ex) {
        console.log(ex);
    }
  };
};
