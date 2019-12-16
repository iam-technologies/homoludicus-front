import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Discounts GETBYCODE
 *
 * @param {String} code
 * @param {function} callback
 *
 */
export default (code, callback) => {
  const url = `/discount/${code}`;
  const { userId } = session.get();
  const headers = addHeaders();

  const params = {};
  if (userId) {
    params.userId = userId;
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
