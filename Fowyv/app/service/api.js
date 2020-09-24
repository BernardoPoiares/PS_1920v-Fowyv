const BASE_URL = 'http://192.168.1.173:4000';
//const BASE_URL = 'https://fowyv-backend.azurewebsites.net';

export const api = async (url, method, body = null, headers = {}) => {
  try {
    const endPoint = BASE_URL + url;
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
    const timeOutPromise = new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Request Timeout')), 30000),
    );

    const response = await Promise.race([fetchPromise, timeOutPromise]);

    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchApi = async (url, method, body, statusCode, token = null) => {
  try {
    const headers = {};
    const result = {
      success: false,
      status: 0,
      responseBody: null,
    };
    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    const response = await api(url, method, body, headers);
    result.status = response.status;
    if (response.status === statusCode) {
      result.success = true;
    }
    if (response.headers.get('Content-Type')) {
      result.responseBody = await response.json();
    }

    return result;
  } catch (error) {
    throw error;
  }
};
