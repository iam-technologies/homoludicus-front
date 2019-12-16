import configApi from '../config';
import session from './session';


export default (isPrivate = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (configApi.authRequire && isPrivate) {
    const sessionData = session.get();

    headers['X-Auth-Token'] = sessionData.authToken;
    headers['X-User-Id'] = sessionData.userId;
  }

  return headers;
};
