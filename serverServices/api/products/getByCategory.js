import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * @param {String} newUrl
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description paramsQuery contains 4 objects, lang, query, options, filters. By default is empty.
 */
export default (newUrl = '', paramsQuery = {}, callback) => {
  const {
    lang,
    query,
    options,
    options2,
    filters
  } = {
    lang: '',
    query: '',
    options: '',
    options2: '',
    filters: '',
    ...paramsQuery
  };

  const url = `/products-by-cat/${newUrl}`;
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

  if (options2) {
    params.options = JSON.stringify(options2);
  }

  if (filters) {
    params.filters = JSON.stringify(filters);
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
