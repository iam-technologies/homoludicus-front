import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * Categories GETALL
 *
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description paramsQuery contains two objects, query and options. By default is empty.
 */
export default (paramsQuery = {}, callback) => {
  const { query, options } = { query: '', options: '', ...paramsQuery };

  const url = '/categories';
  const headers = addHeaders();

  const params = {};
  if (query) {
    params.query = JSON.stringify(query);
  }

  if (options) {
    params.options = JSON.stringify(options);
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
