import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Account FORGOTPASSWORD
 *
 * @param {String} email
 * @param {function} callback
 *
 */
export default (email, callback) => {
  const url = '/forgot-password';
  const headers = addHeaders();

  const data = JSON.stringify({ email });

  return axios({ method: 'post', url, headers, data })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.users(error, callback));
};
