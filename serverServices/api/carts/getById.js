import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, sessionCart } from '../../utils';

/**
 * Carts GETBYID
 *
 * @param {function} callback
 *
 */
export default (callback) => {
  const id = sessionCart.get();
  const url = `/carts/${id}`;
  const headers = addHeaders();

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.carts(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
