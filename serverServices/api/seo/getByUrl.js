import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';


export default (path = 'home', callback) => {
  const urlPath = path || 'home';
  const url = `/seo-info/${urlPath}`;
  const headers = addHeaders();

  return axios({ method: 'get', url, headers })
    .then((response) => {
      catchResponse.api(response, callback);
    })
    .catch((error) => {
      catchErrors.api(error, callback);
    });
};
