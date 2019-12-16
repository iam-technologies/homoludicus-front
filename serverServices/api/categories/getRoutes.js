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
  const { lang } = { lang: '', ...paramsQuery };

  const url = '/categories/routes';
  const headers = addHeaders();

  const params = {};
  if (lang) {
    params.lang = lang;
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
