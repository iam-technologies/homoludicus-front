import React from 'react';

import { Layout, Address, PrivateRoute } from '../components';

const addresses = ({ isServer }) => (
  <Layout>
    <PrivateRoute isServer={isServer}>
      <Address />
    </PrivateRoute>
  </Layout>
);

addresses.getInitialProps = async ({ isServer }) => {
  return { isServer };
};


export default addresses;
