import axios from 'axios';

import { addHeaders, catchErrors, session } from '../../utils';

/**
 * Account LOGIN
 *
 * @param {String} email
 * @param {String} password
 * @param {function} callback
 *
 */
const login = (email, password, callback) => {
  const url = '/login';
  const headers = addHeaders();

  const data = JSON.stringify({ email, password });

  return axios({ method: 'post', url, headers, data })
    .then((response) => {
      const { data: newData } = response;
      const { status, data: userData } = newData;

      if (status === 'success') {
        session.add(userData);

        return callback(undefined, true);
      }

      return callback(newData, undefined);
    })
    .catch((error) => {
      const { data: errorData } = error.response;

      if (errorData) {
        // Check if password is old
        return axios({ method: 'post', url: '/update-old-password', headers, data })
          .then((nextResponse) => {
            const { data: nextData } = nextResponse;

            if (nextData.ok) {
              return login(email, password, callback);
            }

            return callback(nextData, undefined);
          })
          .catch(errors => catchErrors.users(errors, callback));
      }

      return callback(error, undefined);
    });
};


export default login;
