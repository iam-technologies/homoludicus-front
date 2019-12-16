import React from 'react';

import { Layout, OrderList, PrivateRoute } from '../components';

const orders = ({ isServer }) => (
  <Layout>
    <PrivateRoute isServer={isServer}>
      <OrderList />
    </PrivateRoute>
  </Layout>
);

orders.getInitialProps = async ({ isServer }) => {
  return { isServer };
};


export default orders;
