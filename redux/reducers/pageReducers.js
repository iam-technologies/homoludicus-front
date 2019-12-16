import { CHANGE_THEME } from '../actions/pageActions';

const defaultState = {
  color: 'tomato'
};

export default (state = defaultState, action) => {
  let newValue;

  switch (action.type) {
    case CHANGE_THEME:
      newValue = Object.assign({}, state, { color: action.payload.color });
      return Object.assign({}, state, newValue);

    default:
      return state;
  }
};
