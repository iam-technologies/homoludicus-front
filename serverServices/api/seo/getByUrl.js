import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';


export default (path = 'home', callback) => {
  const urlPath = path || 'home';
  const url = `/seo-info/${urlPath}`;
  const headers = addHeaders();

  return axios({ method: 'get', url, headers })
    .then(response => {
      console.log('axios ​response', response);
      catchResponse.api(response, callback)
    })
    .catch(error => {
      console.log('axios ​error', error);
      catchErrors.api(error, callback)
    });
};
