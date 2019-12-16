import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 *
 * @param {String} newUrl
 * @param {Object} paramsQuery
 * @param {function} callback
 * @description paramsQuery contains one object, lang. By default is empty.
 */
export default (newUrl = '', paramsQuery, userId, callback) => {
  const { lang } = { lang: '', ...paramsQuery };

  const url = `/products/${newUrl}`;

  const headers = addHeaders();

  const params = {};
  if (lang) {
    params.lang = lang;
  }

  if (userId) {
    params.userId = userId;
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
