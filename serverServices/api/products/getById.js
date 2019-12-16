import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

export default (id, callback) => {
  const url = `/product-by-id/${id}`;
  const headers = addHeaders(true);

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
