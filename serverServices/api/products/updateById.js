import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';


export default (productId, notifyAvailability, callback) => {
  const url = `/products/notify/${productId}`;
  const headers = addHeaders(true);

  const data = JSON.stringify(notifyAvailability);

  return axios({ method: 'put', url, headers, data })
    .then((response) => {
      return catchResponse.api(response, callback)
    })
    .catch((error) => {
      return catchErrors.api(error, callback)
    });
};
