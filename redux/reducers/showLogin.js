import { LOGIN_CHANGE_SHOW } from '../actions/showLoginActs';

export default (state = { show: false, toMyAccount: false }, action) => {
  if (action.type === LOGIN_CHANGE_SHOW) {
    return { ...state, show: action.show, toMyAccount: action.toMyAccount };
  }

  return state;
};
