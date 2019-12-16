import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Users GETBYID
 *
 * @param {function} callback
 *
 */
export default (callback) => {
  const { userId } = session.get();

  const url = `/users/${userId}`;
  const headers = addHeaders(true);

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.users(error, callback));
};
