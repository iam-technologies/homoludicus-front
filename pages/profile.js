import React from 'react';

import { Layout, Profile, PrivateRoute } from '../components';

const profile = ({ isServer }) => (
  <Layout>
    <PrivateRoute isServer={isServer}>
      <Profile />
    </PrivateRoute>
  </Layout>
);

profile.getInitialProps = async ({ isServer }) => {
  return { isServer };
};

export default profile;
