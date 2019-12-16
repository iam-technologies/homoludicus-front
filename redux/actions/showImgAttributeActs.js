// Actions Add configuration attribute to the product.
const show = img => dispatch => dispatch({
  type: 'SHOW_IMG_ATTRIBUTE',
  img
});


// Actions Remove all configuration attributes of the product.
const remove = () => dispatch => dispatch({
  type: 'REMOVE_IMG_ATTRIBUTE'
});


export default {
  show,
  remove
};
