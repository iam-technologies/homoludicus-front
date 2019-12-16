import React from 'react';

import { Layout, MyAccount, PrivateRoute } from '../components';

const myAccount = ({ isServer }) => (
  <Layout>
    <PrivateRoute isServer={isServer}>
      <MyAccount />
    </PrivateRoute>
  </Layout>
);

myAccount.getInitialProps = async ({ isServer }) => {
  return { isServer };
};

export default myAccount;
