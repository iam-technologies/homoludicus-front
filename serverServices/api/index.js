import axios from 'axios';

import configApi from '../config';

import account from './account';
import carts from './carts';
import categories from './categories';
import contents from './contents';
import discounts from './discounts';
import favourites from './favourites';
import orders from './orders';
import products from './products';
import ratings from './ratings';
import search from './search';
import selections from './selections';
import seo from './seo';
import users from './users';

// Config axios url base
axios.defaults.baseURL = configApi.baseUrl;


export default {
  account,
  carts,
  categories,
  contents,
  discounts,
  favourites,
  orders,
  products,
  ratings,
  search,
  selections,
  seo,
  users
};
