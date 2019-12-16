import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Users UPDATEBYID
 *
 * @param {Object} user
 * @param {String} password
 * @param {function} callback
 *
 * @description user is a object of type UsersSchema
 *
 */
export default (user, callback) => {
  const { userId } = session.get();

  const url = `/users/${userId}`;
  const headers = addHeaders(true);

  const data = JSON.stringify(user);

  return axios({ method: 'put', url, headers, data })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.users(error, callback));
};
