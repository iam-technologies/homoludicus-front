import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Ratings UPSERT
 *
 * @param {Object} item
 * @param {function} callback
 *
 * @description item contains an objects of type RatingsSchema.
 *
 * If there isn't an "_id" in item, it make a post, but make a put.
 */
export default (item, callback) => {
  const newItem = { ...item };

  const { _id } = newItem;
  const { userId } = session.get();

  if (userId) newItem.userId = userId;

  const url = `/ratings${_id ? `/${_id}` : ''}`;
  const method = _id ? 'put' : 'post';
  const headers = addHeaders(true);

  const data = JSON.stringify(newItem);

  return axios({ method, url, data, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
