import { session } from '../../utils';
import getById from '../users/getById';

/**
 * Account ONLOGIN
 *
 * @param {function} callback
 *
 */
export default (callback) => {
  const sessionData = session.get();
  const { userId, authToken } = sessionData;

  if (userId && authToken) {
    return getById((error, res) => {
      if (res) {
        session.add(sessionData);

        return callback(undefined, true);
      }

      session.remove();
      return callback(true, undefined);
    });
  }

  session.remove();
  return callback(true, undefined);
};
