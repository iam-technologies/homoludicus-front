import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * Products GETALL
 *
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description paramsQuery contains two objects, query and options. By default is empty.
 */
export default (paramsQuery = {}, callback) => {
  const { query, options, filters } = { query: '', options: '', filters: '', ...paramsQuery };

  const url = '/products-by-cat/todos';
  const headers = addHeaders();

  const params = {};
  if (query) {
    params.query = JSON.stringify(query);
  }

  if (options) {
    params.options = JSON.stringify(options);
  }

  if (filters) {
    params.filters = JSON.stringify(filters);
  }

  return axios({ method: 'get', url, headers, params })
    .then((response) => {
      return catchResponse.api(response, callback);
    })
    .catch(error => catchErrors.api(error, callback));
};
