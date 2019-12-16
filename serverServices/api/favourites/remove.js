import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Favourites REMOVE
 *
 * @param {String} favourite
 * @param {function} callback
 *
 */
export default (favourite, callback) => {
  const { userId } = session.get();

  const url = `/favourites/${userId}`;
  const headers = addHeaders(true);

  const data = JSON.stringify({ favourite, remove: true });

  return axios({ method: 'put', url, headers, data })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
