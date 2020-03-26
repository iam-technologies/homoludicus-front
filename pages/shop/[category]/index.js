import React from 'react';
import _get from 'lodash/get';
import { api, getImageUrl } from '../../../serverServices';
import { Layout } from '../../../components';
import ShopRender from '../../../components/shopComponents/ShopRender';
import { userActs } from '../../../redux/actions';


const shop = (props) => {
  return (
    <Layout>
      <ShopRender {...props} />
    </Layout>
  );
};

shop.getInitialProps = async ({ query, asPath }) => {
  const { category, productTags, age, players } = query;
  const filters = {};

  if (productTags) filters.productTags = productTags;
  if (age) filters.age = age;
  if (players) filters.players = players;

  const content = await api.contents.getByKey('home', (err, res) => {
    return res ? res.data : null;
  });
  const imgUrl = await getImageUrl(content);
  const selection = _get(content, 'selections', '');
  const categories = await api.categories.getAll({ query: { idFather: '0' } }, (err, res) => {
    return res ? res.data : null;
  });

  const totalProducts = await api.products.getAll({}, (err, res) => {
    return res ? res.data : null;
  });

  const totalPages = Math.ceil(totalProducts.numProducts / 12);

  const options = { limit: totalProducts.numProducts, skip: 0 };

  const allProducts = await api.products.getByCategory(category, { options, filters }, (err, res) => {
    return res ? res.data : null;
  });

  return {
    content,
    selection,
    loaded: true,
    imgUrl,
    categories,
    allProducts,
    category,
    newFilters: filters,
    totalPages,
    asPath
  };
};

export default shop;
