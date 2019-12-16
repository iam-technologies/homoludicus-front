import React from 'react';
import ForgotPassword from '../components/Account/ForgotPassword';
import { Layout } from '../components';

const forgotPassword = ({ id }) => (
  <Layout>
    <ForgotPassword />
  </Layout>
);

// forgotPassword.getInitialProps = async () => {
//   console.log('forgotPassword page: ');
// };

export default forgotPassword;
