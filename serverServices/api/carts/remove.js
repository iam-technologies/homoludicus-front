import { sessionCart } from '../../utils';

/**
 * Carts REMOVE
 *
 * @param {function} callback
 *
 */
export default (callback) => {
  const remove = sessionCart.remove();

  return callback(undefined, remove);
};
