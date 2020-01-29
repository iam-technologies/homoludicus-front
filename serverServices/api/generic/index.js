import axios from 'axios';
import configApi from '../../config';

import { addHeaders, catchErrors, catchResponse } from '../../utils';

/**
 * Generic
 *
 * @param {function} callback
 *
 */
const getGeneric = async (callback) => {
  const apiUrl = configApi.baseUrl;
  const url = `${apiUrl}/generic`;
  const headers = addHeaders();

  try {
    const response = await axios({ method: 'get', url, headers });
    catchResponse.api(response, callback);
  } catch (error) {
    catchErrors.api(error, callback);
  }
};


// export default async (callback) => {
//   const url = '/generic';
//   const headers = addHeaders();

//   try {
//     const response = await axios({ method: 'get', url, headers });
//     return catchResponse.api(response, callback);
//   } catch (error) {
//     return catchErrors.api(error, callback);
//   }
// };
export default { getGeneric };