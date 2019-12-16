import session from './session';
import isClient from './isClient';

const errorNotAuth = (response, data) => {
  if (data.status === 'error' && response.status === 401) {
    session.remove();
    if (isClient) window.history.back();
  }
};


const api = (error, callback) => {
  let errorData = error.message;

  if (error.response) {
    const { response } = error;
    const { data } = response;

    errorNotAuth(response, data);

    errorData = data;
  }

  callback(errorData, undefined);
};


const users = (error, callback) => {
  const { data } = error.response;

  if (data) {
    return callback(data, undefined);
  }

  return callback(error, undefined);
};


export default {
  api,
  users
};
