export default (state = { value: false }, action) => {
  if (action.type === 'CHANGE_SHOW_CART_POPUP') {
    return { ...state, value: action.show };
  }

  return state;
};
