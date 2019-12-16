import axios from 'axios';

import { addHeaders, catchErrors, catchResponse, session } from '../../utils';

/**
 * Favourites ADD
 *
 * @param {String} favourite
 * @param {function} callback
 *
 */
export default (favourite, callback) => {
  const { userId } = session.get();

  if (!userId) return { data: false };

  const url = `/favourites/${userId}/${favourite}`;
  const headers = addHeaders(true);

  return axios({ method: 'get', url, headers })
    .then(response => catchResponse.api(response, callback))
    .catch(error => catchErrors.api(error, callback));
};
