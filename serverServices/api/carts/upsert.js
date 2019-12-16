import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, sessionCart, session } from '../../utils';

/**
 * Carts UPSERT
 *
 * @param {Object} item
 * @param {function} callback
 *
 * @description item contains an objects of type OrdersSchema.
 *
 * If there isn't an "_id" in item, it make a post, but make a put.
 */
export default (item, callback) => {
  const id = sessionCart.get();
  const { userId } = session.get();
  const newItem = { ...item };

  if (userId) newItem.userId = userId;

  const url = `/carts${id ? `/${id}` : ''}`;
  const method = id ? 'put' : 'post';
  const headers = addHeaders();

  const data = JSON.stringify(newItem);

  return axios({ method, url, data, headers })
    .then(response => catchResponse.carts(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
