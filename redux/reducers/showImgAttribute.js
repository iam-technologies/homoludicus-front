/**
 * Store if user config product.
 *
 * @param {Object} state
 * @param {Object} action
 *
 * @return {Object} - with the value of img
 */
export default (state = { value: '' }, action) => {
  switch (action.type) {
    case 'SHOW_IMG_ATTRIBUTE':
      return { value: action.img };

    case 'REMOVE_IMG_ATTRIBUTE':
      return { value: '' };

    default:
      return state;
  }
};
