import React from 'react';

import { Layout } from '../../components';

const searchByBudget = ({ price }) => (
  <Layout>
    <div>no disponible</div>
    {/* <SearchByBudget price={price} /> */}
  </Layout>
);

searchByBudget.getInitialProps = async ({ query }) => {
  const { price } = query;

  return { price };
};

export default searchByBudget;
