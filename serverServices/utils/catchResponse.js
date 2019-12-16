import sessionCart from './sessionCart';


const api = (response, callback) => {
  const { data } = response;

  if (data.ok) {
    return callback(null, response.data);
  }
  return callback(response.data, null);
};


const carts = (response, callback) => {
  const { data } = response;

  if (data.ok) {
    const { _id } = data.data;

    if (_id) {
      sessionCart.add(_id);
    } else {
      sessionCart.remove();
    }

    callback(null, response.data);
  } else {
    if (data.error && data.data[0].type === 'invalid-id') {
      sessionCart.remove();
    }

    callback(response.data, null);
  }
};


export default {
  api,
  carts
};
