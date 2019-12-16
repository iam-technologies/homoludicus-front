import React from 'react';
import Page404 from '../components/Page404';
import { Layout } from '../components';

const page404 = () => (
  <Layout>
    <Page404 />
  </Layout>
);

page404.getInitialProps = async () => {
  console.log('404 page: ');
};

export default page404;
