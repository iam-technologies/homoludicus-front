import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description By default is empty.
 */
export default (paramsQuery = {}, callback) => {
  const {
    lang,
    query,
    options,
    search
  } = {
    lang: '',
    query: '',
    options: '',
    search: '',
    ...paramsQuery
  };

  const url = '/products-by-cat/todos';
  const headers = addHeaders();

  const params = {};
  if (lang) {
    params.lang = lang;
  }
  if (query) {
    params.query = JSON.stringify(query);
  }

  if (options) {
    params.options = JSON.stringify(options);
  }

  if (search) {
    params.search = search;
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
