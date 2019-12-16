import { session } from '../../utils';

/**
 * Account CHECKLOGIN
 *
 * @return {Boolean} true if user is login.
 *
 */
export default () => {
  const { userId, authToken } = session.get();

  if (userId && authToken) return true;

  return false;
};
