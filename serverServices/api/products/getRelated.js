import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * @param {String} id
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description paramsQuery contains two objects, lang and options. By default is empty.
 */
export default (id = '', paramsQuery, callback) => {
  const { lang, options } = { lang: '', options: '', ...paramsQuery };

  const url = `/products/related/${id}`;
  const headers = addHeaders();

  const params = {};
  if (lang) {
    params.lang = lang;
  }

  if (options) {
    params.options = JSON.stringify(options);
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
