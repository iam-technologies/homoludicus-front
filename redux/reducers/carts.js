import { CARTS_BEGIN, CARTS_FAILURE, CARTS_SUCCESS, CARTS_REMOVE } from '../actions/cartsActs';

const initialState = {
  item: null,
  loading: false,
  error: null
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case CARTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CARTS_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.cart
      };

    case CARTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case CARTS_REMOVE:
      return { ...initialState };

    default:
      return state;
  }
};
