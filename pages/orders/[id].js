import React from 'react';

import { Layout, Order, PrivateRoute } from '../../components';

const orders = ({ isServer }) => (
  <Layout>
    <PrivateRoute isServer={isServer}>
      <Order />
    </PrivateRoute>
  </Layout>
);

orders.getInitialProps = async ({ isServer }) => {
  return { isServer };
};


export default orders;
