/**
 * Store if user is logged in or not.
 *
 * @param {Object} state
 * @param {Object} action
 *
 * @return {Object} - Where the key "login" has a boolean.
 * @default {Object}  - login is false.
 */
const isLogin = (state = { login: false }, action) => {
  if (action.type === 'IS_LOGIN') {
    return { ...state, login: action.login };
  }

  return state;
};

export default isLogin;
