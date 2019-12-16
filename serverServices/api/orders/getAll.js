import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Orders GETALL
 *
 * @param {function} callback
 *
 */
export default (callback) => {
  const url = '/order';
  const headers = addHeaders(true);

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
