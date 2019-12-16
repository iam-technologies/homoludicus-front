import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Account LOGIN
 *
 * @param {String} email
 * @param {String} password
 * @param {Object} profile
 * @param {function} callback
 *
 * @description profile is a object of type UsersSchema
 *
 */
export default (email, password, profile = {}, callback) => {
  const url = '/users';
  const headers = addHeaders();

  const data = JSON.stringify({ email, password, profile });

  return axios({ method: 'post', url, headers, data })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.users(error, callback));
};
