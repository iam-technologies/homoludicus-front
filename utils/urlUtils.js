import _ from 'lodash';

import routes from './routes';

const getParamsUrl = (path = [], { match }, lastValue = false) => {
  if (lastValue) {
    const { url } = match;
    const urlSplit = url.split('/');

    return urlSplit[urlSplit.length - 1];
  }

  if (Array.isArray(path)) {
    return path.map(elem => ({ [elem]: _.get(match.params, elem, '') }));
  }

  return _.get(match.params, path, '');
};


const linkToCategory = (id = '') => routes.getRoute(id);

const linkToSearch = (url = '') => `/search/${url}`;

const linkToProduct = (location = '', item = {}) => {
  const { url } = item;
  const urlProduct = _.get(url, 'es', '');
  return `/${urlProduct}`;
};

const linkToEditProduct = (product, index) => {
  let url = routes.getRoute(_.get(product, 'mainCategory._id', ''));

  if (!url) {
    url = routes.getRoute(_.get(product, 'categories.0._id', ''));
  }

  if (url && index >= 0) {
    return `${url}/${_.get(product, 'url.es')}/${index}`;
  }

  return '#';
};

const urlToPathLink = url => url.replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, '/');


export default {
  getParamsUrl,
  linkToCategory,
  linkToEditProduct,
  linkToProduct,
  linkToSearch,
  urlToPathLink
};
