import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Selections GETBYID
 *
 * @param {String} id
 * @param {function} callback
 *
 */
export default (id, callback) => {
  const url = `/selections/${id}`;
  const headers = addHeaders();

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
