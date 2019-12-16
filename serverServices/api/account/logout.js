import axios from 'axios';

import { addHeaders, session } from '../../utils';

/**
 * Account LOGOUT
 *
 * @param {function} callback
 *
 */
export default (callback) => {
  const url = '/logout';
  const headers = addHeaders(true);

  return axios({ method: 'post', url, headers })
    .then(({ data }) => {
      const { status } = data;

      if (status === 'success') {
        session.remove();

        callback(undefined, true);
        return;
      }

      callback(true, undefined);
    })
    .catch(callback(true, undefined));
};
