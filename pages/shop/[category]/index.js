import React from 'react';
import { api, getImageUrl } from '../../../serverServices';
import { Layout } from '../../../components';
import ShopRender from '../../../components/shopComponents/ShopRender';

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
  const selection = content.selections || [];
  const categories = await api.categories.getAll({ query: { idFather: '0' } }, (err, res) => {
    return res ? res.data : null;
  });

  const options = { limit: 6, skip: 0 };
  const options2 = { limit: 6, skip: 6 };

  const allProducts = await api.products.getByCategory(category, { options, filters }, (err, res) => {
    return res ? res.data : null;
  });

  const allProducts2 = await api.products.getByCategory(category, { options2, filters }, (err, res) => {
    return res ? res.data : null;
  });

  return {
    content,
    selection,
    loaded: true,
    imgUrl,
    categories,
    allProducts,
    allProducts2,
    category,
    newFilters: filters,
    asPath
  };
};

export default shop;
