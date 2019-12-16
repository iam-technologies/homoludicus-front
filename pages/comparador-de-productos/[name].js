import React from 'react';

import { Layout, Compare } from '../../components';

const compareProducts = ({ name, selectedItems }) => (
  <Layout>
    <Compare catName={name} selectedItems={selectedItems} />
  </Layout>
);

compareProducts.getInitialProps = async ({ query }) => {
  const { name, selectedItems } = query;

  return { name, selectedItems: JSON.parse(selectedItems) };
};

export default compareProducts;
