import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * @param {String} newUrl
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description paramsQuery contains two objects, lang and options. By default is empty.
 */
export default (newUrl = '', paramsQuery, callback) => {
  const { lang, options, filters } = { lang: '', options: '', filters: '', ...paramsQuery };

  const url = `/products/category/${newUrl}`;
  const headers = addHeaders();

  const params = {};
  if (lang) {
    params.lang = lang;
  }

  if (options) {
    params.options = JSON.stringify(options);
  }

  if (filters) {
    params.filters = JSON.stringify(filters);
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
