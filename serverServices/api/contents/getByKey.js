import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Contents GETBYKEY
 *
 * @param {String} key
 * @param {function} callback
 *
 */
export default (key, callback) => {
  const url = `/contents/${key}`;
  const headers = addHeaders();

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
