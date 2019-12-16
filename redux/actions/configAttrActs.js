// Actions Add configuration attribute to the product.
const add = attribute => dispatch => dispatch({
  type: 'ADD_ATTRIBUTE',
  attribute
});


// Actions remove one attribute
const remove = (config, path) => (dispatch) => {
  const newConfig = { ...config };
  if (newConfig[path]) {
    delete newConfig[path];
  }

  return dispatch({
    type: 'REMOVE_ONE_ATTRIBUTE',
    config: newConfig
  });
};

// Actions Remove all configuration attributes of the product.
const removeAll = () => dispatch => dispatch({ type: 'REMOVE_ATTRIBUTES' });


export default {
  add,
  remove,
  removeAll
};
