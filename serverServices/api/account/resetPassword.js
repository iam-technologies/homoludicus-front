import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Account RESETPASSWORD
 *
 * @param {String} password
 * @param {String} token
 * @param {function} callback
 *
 */
export default (password, token, callback) => {
  const url = '/reset-password';
  const headers = addHeaders();

  const data = JSON.stringify({ password, token });

  return axios({ method: 'post', url, headers, data })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.users(error, callback));
};
