import React from 'react';
import LoginTo from '../components/Account/Login/LoginTo';
import { Layout } from '../components';

const loginTo = () => (
  <Layout>
    <LoginTo />
  </Layout>
);

loginTo.getInitialProps = async () => {
  console.log('loginTo page: ');
};

export default loginTo;
