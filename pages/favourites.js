import React from 'react';

import { Layout, Favourites, PrivateRoute } from '../components';

const favourites = ({ isServer }) => (
  <Layout>
    <PrivateRoute isServer={isServer}>
      <Favourites />
    </PrivateRoute>
  </Layout>
);

favourites.getInitialProps = async ({ isServer }) => {
  return { isServer };
};


export default favourites;
