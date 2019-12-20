import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../routes';

const shop = () => {
  const products = [
    { name: 'joc1',
      text: 'blablabla' },
    { name: 'joc2',
      text: 'blablebli' }
  ];

  return (
    <Layout>
      <p>SHOP</p>
      {products.map((product) => {
        return (
          <Link href="/product">
            <a>
              <div key={product.name}>{product.name}</div>
            </a>
          </Link>
        );
      })}
    </Layout>
  );
};

export default shop;
