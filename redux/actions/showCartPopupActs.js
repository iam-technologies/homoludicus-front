
// Actions change showCartPopup.
const show = () => dispatch => dispatch({
  type: 'CHANGE_SHOW_CART_POPUP',
  show: true
});

const hidden = () => dispatch => dispatch({
  type: 'CHANGE_SHOW_CART_POPUP',
  show: false
});


export default {
  show,
  hidden
};
