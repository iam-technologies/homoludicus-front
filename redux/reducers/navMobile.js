import { SHOW_NAV_MOBILE } from '../actions/navMovileActs';

export default (state = { show: false }, action) => {
  switch (action.type) {
    case SHOW_NAV_MOBILE: {
      return { ...action.payload };
    }

    default:
      return state;
  }
};
