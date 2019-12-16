import _ from 'lodash';

/**
 * Store if user config product.
 *
 * @param {Object} state
 * @param {Object} action
 *
 * @return {Object} - with the configuration of the product..
 * @default {Object}  - return empty object.
 */
export default (state = { value: {} }, action) => {
  switch (action.type) {
    case 'ADD_ATTRIBUTE':
      const newValue = _.assignIn({}, state.value, { ...action.attribute });
      return _.assignIn({}, state, { value: newValue });

    case 'REMOVE_ONE_ATTRIBUTE':
      return { value: { ...action.config } };

    case 'REMOVE_ATTRIBUTES':
      return { value: {} };

    default:
      return state;
  }
};
