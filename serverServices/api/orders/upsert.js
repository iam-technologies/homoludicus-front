import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Orders UPSERT
 *
 * @param {Object} item
 * @param {String} id
 * @param {function} callback
 *
 * @description item contains an objects of type OrdersSchema.
 *
 * If there isn't an "id", it make a post, but make a put.
 */
export default (item, id = '', callback) => {
  const url = `/order${id ? `/${id} ` : ''}`;
  const headers = addHeaders();

  const method = id ? 'put' : 'post';
  const data = JSON.stringify(item);

  return axios({ method, url, data, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
