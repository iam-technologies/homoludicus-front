import infoSource from '../utils/infoSource';

// Config API.
export default {
  authRequire: true,
  baseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/api' : infoSource.baseUrl,
  cookiesCart: 604800, // 7 días
  cookiesExpires: 2592000, // 30 días
  urlImages: infoSource.urlImages
};
