import React from 'react';

const budgetCheckout = () => (
  <div>
    <h1>this is budgetCheckout page</h1>
  </div>
);

budgetCheckout.getInitialProps = async () => {
  console.log('budgetCheckout page: ');
};

export default budgetCheckout;
