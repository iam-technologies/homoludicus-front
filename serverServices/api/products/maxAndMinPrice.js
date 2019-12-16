import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

export default (paramsQuery = {}, callback) => {
  const { lang } = { lang: '', ...paramsQuery };

  const url = '/products/prices';
  const headers = addHeaders();

  const params = {};
  if (lang) {
    params.lang = lang;
  }

  return axios({ method: 'get', url, headers, params })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
