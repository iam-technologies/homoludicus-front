import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Users CHANGEDPASSWORD
 *
 * @param {String} oldPassword
 * @param {String} password
 * @param {function} callback
 *
 */
export default (oldPassword, password, callback) => {
  const { userId } = session.get();

  const url = '/changed-password';
  const headers = addHeaders(true);

  const data = JSON.stringify({ oldPassword, password, id: userId });

  return axios({ method: 'post', url, headers, data })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.users(error, callback));
};
