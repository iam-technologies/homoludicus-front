const showSearch = (state = { show: false }, action) => {
  if (action.type === 'CHANGE_SHOW_SEARCH') {
    return Object.assign({}, state, { show: action.show });
  }

  return state;
};

export default showSearch;
