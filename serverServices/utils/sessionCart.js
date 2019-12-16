import cookies from 'cookies-js';

import configApi from '../config';
import isClient from './isClient';

if (isClient) cookies(window); // checar
cookies.defaults = {
  domain: configApi.cookiesDomain || undefined,
  expires: configApi.cookiesCart || 604800,
  path: configApi.cookiesPath || '/',
  secure: configApi.cookiesSecure || false
};


const add = (cartId) => {
  if (!isClient) return; // checar

  if (cookies.enabled) {
    cookies.set('cartId', cartId);

  // if cookies is disabled
  } else if ('localStorage' in window && window.localStorage !== null) {
    localStorage.setItem('cartId', cartId);
  }
};


const get = () => {
  if (!isClient) return; // checar

  if (cookies.enabled) return cookies.get('cartId');

  // if cookies is disabled
  if ('localStorage' in window && window.localStorage !== null && localStorage.cartId) {
    const { cartId } = localStorage;

    return cartId;
  }

  return undefined;
};


const remove = () => {
  if (!isClient) return; // checar

  if (cookies.enabled) {
    cookies.expire('cartId');

  // if cookies is disabled
  } else if ('localStorage' in window && window.localStorage !== null && localStorage.cartId) {
    localStorage.removeItem('cartId');
  }

  return true;
};


export default {
  add,
  get,
  remove
};
