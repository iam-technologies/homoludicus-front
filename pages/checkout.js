import React from 'react';

import { Layout, Checkout } from '../components';

const checkout = () => (
  <Layout>
    <Checkout />
  </Layout>
);

// checkout.getInitialProps = async () => {
//   console.log('checkout page: ');
// };

export default checkout;
