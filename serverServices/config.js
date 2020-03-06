import infoSource from '../utils/infoSource';

// Config API.
export default {
  authRequire: true,
  // baseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/api' : infoSource.baseUrl,

  // producción =>
  baseUrl: 'https://admin-homoludicus.admin-iam.com/api',
  // local =>
  // baseUrl: 'http://localhost:3001/api',

  cookiesCart: 604800, // 7 días
  cookiesExpires: 2592000, // 30 días
  urlImages: 'https://s3-eu-central-1.amazonaws.com/homoludicus/'
};
