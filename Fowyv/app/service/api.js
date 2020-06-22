const BASE_URL = 'http://192.168.1.131:3001';

export const api = async (url, method, body = null, headers = {}) => {
  try {
    const endPoint = BASE_URL.concat(url);
    const reqBody = body ? JSON.stringify(body) : null;

    const fetchParams = {method, headers};

    if (method === 'POST' && method === 'PUT' && !reqBody) {
      throw new Error('Request body required');
    }

    if (reqBody) {
      fetchParams.headers['Content-type'] = 'application/json';
      fetchParams.body = reqBody;
    }

    const fetchPromise = fetch(endPoint, fetchParams);
    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Request Timeout');
      }, 100000);
    });

    const response = await Promise.race([fetchPromise, timeOutPromise]);

    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchApi = async (
  url,
  method,
  body,
  statusCode,
  token = null,
  loaders = false,
) => {
  try {
    const headers = {};
    const result = {
      token: null,
      success: false,
      responseBody: null,
    };
    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    const response = await api(url, method, body, headers);
    if (response.status === statusCode) {
      result.success = true;
      if (response.headers.get('Content-Type')) {
        result.responseBody = await response.json();
      }
    }

    return result;
  } catch (error) {
    throw error;
  }
};
