import React from 'react';
import ResetPassword from '../components/Account/ResetPassword';
import { Layout } from '../components';

const resetPassword = ({ id }) => (
  <Layout>
    <ResetPassword />
  </Layout>
);

resetPassword.getInitialProps = async () => {
  console.log('forgotPassword page: ');
};

export default resetPassword;
