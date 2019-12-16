import _ from 'lodash';
import { api } from '../../serverServices';
import showCartPopupActs from './showCartPopupActs';

export const CARTS_BEGIN = 'CARTS_BEGIN';
export const CARTS_SUCCESS = 'CARTS_SUCCESS';
export const CARTS_FAILURE = 'CARTS_FAILURE';
export const CARTS_REMOVE = 'CARTS_REMOVE';


const cartsBegin = () => ({ type: CARTS_BEGIN });

const cartsSuccess = cart => ({
  type: CARTS_SUCCESS,
  payload: { cart }
});

const cartsFailure = error => ({
  type: CARTS_FAILURE,
  payload: { error }
});

const cartsUpsert = (dispatch, newItem, isPopup = false) => {
  dispatch(cartsBegin());

  api.carts.upsert(newItem, (error, res) => {
    if (res) {
      if (isPopup) {
        dispatch(showCartPopupActs.show());
      }

      return dispatch(cartsSuccess(res.data));
    }

    return dispatch(cartsFailure(error.data));
  });
};


/**
 * ACTIONS FOR REDUCER
 */
const addProduct = (newProduct = '', isPopup = true) => (dispatch, getOldState) => {
  const item = getOldState().carts.item || {};
  const newItem = { ...item };

  if (!newItem.products) newItem.products = [];
  if (newProduct) {
    newItem.products.push(newProduct);

    cartsUpsert(dispatch, newItem, isPopup);
  }
};

const addRepeatOrder = (products = []) => (dispatch, getOldState) => {
  const item = getOldState().carts.item || {};
  const newItem = { ...item };

  if (!newItem.products) newItem.products = [];
  if (products.length > 0) {
    newItem.products.push(...products);

    cartsUpsert(dispatch, newItem, true);
  }
};


const addPayOrder = (order = {}) => (dispatch) => {
  dispatch(cartsBegin());

  const newItem = _.get(order, 'cart', {});
  const shippingPrice = _.get(order, 'shipping.price', 0);
  _.set(newItem, 'disabled', true);
  _.set(newItem, 'shippingPrice', shippingPrice);

  return dispatch(cartsSuccess(newItem));
};


const removeProduct = index => (dispatch, getOldState) => {
  const { item } = getOldState().carts;
  const newItem = { ...item };

  if (_.get(newItem, 'products', []).length <= 0) return;

  newItem.products.splice(index, 1);

  cartsUpsert(dispatch, newItem, false);
};


const updateProduct = (newProduct, index) => (dispatch, getOldState) => {
  const { item } = getOldState().carts;
  const newItem = { ...item };

  if (_.get(newItem, `products.${index}`, false)) {
    newItem.products[index] = newProduct;

    cartsUpsert(dispatch, newItem, true);
  }
};


const addDiscount = discount => (dispatch, oldStates) => {
  const { item } = oldStates().carts;

  if (item) {
    const newItem = { ...item, discount };

    cartsUpsert(dispatch, newItem, false);
  }
};


const removeDiscount = () => (dispatch, oldStates) => {
  const { item } = oldStates().carts;

  if (item && item.discount) {
    const newItem = { ...item };
    newItem.discount = {};

    cartsUpsert(dispatch, newItem, false);
  }
};


const getCart = () => (dispatch) => {
  dispatch(cartsBegin());

  api.carts.getById((error, res) => {
    if (res) {
      return dispatch(cartsSuccess(res.data));
    }

    return dispatch(cartsFailure(error.data));
  });
};


const removeCart = () => (dispatch) => {
  api.carts.remove((error, res) => {
    if (res) {
      return dispatch({ type: CARTS_REMOVE });
    }

    return dispatch(cartsFailure(error.data));
  });
};


export default {
  addDiscount,
  addRepeatOrder,
  addPayOrder,
  removeDiscount,
  addProduct,
  getCart,
  removeCart,
  removeProduct,
  updateProduct
};
