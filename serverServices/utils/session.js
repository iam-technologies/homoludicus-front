import cookies from 'cookies-js';

import configApi from '../config';
import isClient from './isClient';

if (isClient) cookies(window); // checar

cookies.defaults = {
  domain: configApi.cookiesDomain || undefined,
  expires: configApi.cookiesExpires || 2592000,
  path: configApi.cookiesPath || '/',
  secure: configApi.cookiesSecure || false
};


const add = ({ authToken, userId }) => {
  if (!isClient) return; // checar

  if (cookies.enabled) {
    cookies.set('authToken', authToken);
    cookies.set('userId', userId);

    return;
  }

  // if cookies is disabled
  if (isClient && 'localStorage' in window && window.localStorage !== null) {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userId', userId);
  }
};


const get = () => {
  if (!isClient) return; // checar

  const sessionData = {};

  if (cookies.enabled) {
    sessionData.authToken = cookies.get('authToken');
    sessionData.userId = cookies.get('userId');

    return sessionData;
  }

  // if cookies is disabled
  if (isClient && 'localStorage' in window && window.localStorage !== null) {
    if (localStorage.authToken && localStorage.userId) {
      sessionData.authToken = localStorage.authToken;
      sessionData.userId = localStorage.userId;

      return sessionData;
    }
  }

  return sessionData;
};


const remove = () => {
  if (!isClient) return; // checar

  if (cookies.enabled) {
    cookies.expire('authToken');
    cookies.expire('userId');

    return true;
  }

  // if cookies is disabled
  if (isClient && 'localStorage' in window && window.localStorage !== null) {
    if (localStorage.authToken && localStorage.userId) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');

      return true;
    }
  }

  return true;
};


export default {
  add,
  remove,
  get
};
