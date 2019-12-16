import _ from 'lodash';

import checksExceptions from './checksExceptions';
import dataFormat from '../dataFormat';

const round = (value, exp = 2) => Number(value.toFixed(exp));

const roundUnicode = (value, exp = 2) => Number(value.toFixed(exp).replace(/,/g, '.'));

const getBadgePrice = (product) => {
  const { sale = 0, saleType, saleActive, taxIncluded, taxRate } = product;

  if (saleActive) {
    if (saleType === 'percent') {
      return `- ${sale}%`;
    }

    if (!taxIncluded) {
      const rate = (taxRate / 100) + 1;
      return `- ${dataFormat.formatCurrency(round(sale * rate))}`;
    }

    return `- ${dataFormat.formatCurrency(sale)}`;
  }

  return '';
};

const showPriceNotOffer = (product) => {
  const { price = 0, taxIncluded, taxRate, saleActive } = product;

  if (saleActive) {
    if (!taxIncluded) {
      const rate = (taxRate / 100) + 1;
      return `${dataFormat.formatCurrency(round(price * rate))}`;
    }

    return `${dataFormat.formatCurrency(price)}`;
  }

  return '';
};

const getPrice = (product) => {
  const { price = 0, sale = 0, saleType, saleActive, taxIncluded, taxRate } = product;
  let total = Number(price);

  if (saleActive) {
    if (saleType === 'percent') {
      total = Number(((100 - sale) / 100) * total);
    } else {
      total = Number(total - sale);
    }
  }

  // ADD IVA if it isn't included
  if (!taxIncluded) {
    const rate = (taxRate / 100) + 1;
    total *= rate;
  }

  return total;
};


// GET total price of a product
const get = (product, attributes) => {
  let total = getPrice(product);

  // ADD price attributes
  if (attributes) {
    _.forEach(attributes, (attribute) => {
      total += _.get(attribute, 'price', 0);
    });
  }

  // ADD price exceptions
  if (_.get(product, 'attributesException', '') && attributes) {
    const exceptions = checksExceptions(product, attributes);

    if (Array.isArray(exceptions)) {
      exceptions.forEach((elem) => {
        total += _.get(elem, 'price', 0);
      });
    }
  }

  return round(total);
};

// GET total price of a product in unicode notation
const getUnicode = (product, attributes) => {
  let total = getPrice(product);

  // ADD price attributes
  if (attributes) {
    _.forEach(attributes, (attribute) => {
      total += _.get(attribute, 'price', 0);
    });
  }

  // ADD price exceptions
  if (_.get(product, 'attributesException', '') && attributes) {
    const exceptions = checksExceptions(product, attributes);

    if (Array.isArray(exceptions)) {
      exceptions.forEach((elem) => {
        total += _.get(elem, 'price', 0);
      });
    }
  }

  return roundUnicode(total);
};


// GET Subtotal price of a cart
const getCartSubTotal = (products) => {
  const total = products.reduce((sum, elem) => sum + get(_.get(elem, 'product', {}), _.get(elem, 'config', {})), 0);

  return round(total);
};


// GET price of each attribute
const attribute = (value, item) => {
  const total = _.get(value, 'properties.priceIncrement', undefined);

  if (_.get(value, 'propertiesDefault', false) || total === undefined) {
    return round(_.get(item, 'properties.priceIncrement', 0));
  }

  return round(total);
};

const getDiscount = (price, discount, cart) => {
  const { amount, type, code, selection } = discount;
  if (!code) return 0;

  if (selection) {
    const { products: discountProducts } = selection;
    const products = _.get(cart, 'products', []);
    let total = '';
    let count = 0;

    discountProducts.forEach((elem) => {
      const find = products.find(p => _.get(p, 'product._id', '') === elem);
      if (find) {
        total += getPrice(_.get(find, 'product', {}));
        count += 1;
      }
    });

    if (type !== 'percent') {
      return total * count;
    }

    const rate = amount / 100;
    return round(total * rate);
  }

  if (type !== 'percent') {
    return amount;
  }

  const rate = amount / 100;
  return round(price * rate);
};

// GET Total price of a cart with shipping costs
const getCartTotal = (price, shipping, priceDiscount) => {
  const priceShipping = shipping === '' ? 0 : shipping;

  if (priceDiscount <= 0) {
    return round(price + priceShipping);
  }

  return round((price + priceShipping) - priceDiscount);
};


export default {
  get,
  getDiscount,
  getCartSubTotal,
  getCartTotal,
  getUnicode,
  attribute,
  getBadgePrice,
  showPriceNotOffer
};
