// Actions change showSearch.
const show = () => dispatch => dispatch({
  type: 'CHANGE_SHOW_SEARCH',
  show: true
});

const hidden = () => dispatch => dispatch({
  type: 'CHANGE_SHOW_SEARCH',
  show: false
});


export default {
  show,
  hidden
};
