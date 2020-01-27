import axios from 'axios';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Generic
 *
 * @param {String} id
 * @param {function} callback
 *
 */
export default async (callback) => {
  const url = '/generic';
  const headers = addHeaders();

  try {
    const response = await axios({ method: 'get', url, headers });
    return catchResponse.api(response, callback);
  } catch (error) {
    return catchErrors.api(error, callback);
  }
};
