import { LOAD_GENERIC } from '../actions/genericActs';

export default (state = { load: false, doc: {} }, action) => {
  if (action.type === LOAD_GENERIC) {
    return { load: true, doc: action.payload };
  }
  return state;
};
