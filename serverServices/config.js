import infoSource from '../utils/infoSource';

const port = process.env.NODE_ENV === 'production' ? 4001 : 4000;

// Config API.
export default {
  authRequire: true,
  baseUrl: `http://ec2-3-122-75-193.eu-central-1.compute.amazonaws.com:${port}/api`,

  // producción =>
  // baseUrl: 'https://admin-homoludicus.admin-iam.com/api',
  // local =>
  // baseUrl: 'http://localhost:3001/api',

  cookiesCart: 604800, // 7 días
  cookiesExpires: 2592000, // 30 días
  urlImages: 'https://s3-eu-central-1.amazonaws.com/homoludicus/'
};
