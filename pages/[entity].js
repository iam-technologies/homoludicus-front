import React from 'react';
import _get from 'lodash/get';
import Error from './_error';
import Layout from '../components/Layout';
import Product from '../components/product/Product';
import { api } from '../serverServices';
import { routes as utilsRoutes } from '../utils';
import { SEO } from '../components/common';

const dynamicPage = ({ content = {}, serverUrl, categoryId = '', categories }) => {
  // console.log('content: ', content);
  const title = _get(content, categoryId ? 'titleSeo.es' : 'seoTitle.es', '');
  const desc = _get(content, categoryId ? 'descSeo.es' : 'seoDesc.es', '');
  const attachment = _get(content, 'seoImg.attachment', '');

  if (!content) return <Error errorCode={404} categories={categories} />;

  const getItems = (id) => {
    if (id) return <Category id={categoryId} pathname={serverUrl} />;
    return <Product url={serverUrl} categories={categories} />;
  };

  return (
    <Layout>
      <SEO
        title={title}
        description={desc}
        image={attachment}
        path={serverUrl}
      />
      {getItems(categoryId)}
    </Layout>
  );
};

dynamicPage.getInitialProps = async ({ isServer, asPath, req }) => {
  const serverUrl = isServer ? req.url : asPath;

  const routes = await api.categories.getRoutes('', (err, res) => {
    return res ? res.data : null;
  });

  const category = await utilsRoutes.isCategory(serverUrl, routes);
  const categoryId = category ? category._id : null;

  let content;

  if (categoryId) {
    content = await api.categories
      .getFilters(categoryId, '', (error, res) => {
        return res ? res.data : null;
      });
  } else {
    content = await api.products
      .getOne(serverUrl, '', 'unlogged_user', (err, res) => {
        return res ? res.data : null;
      });
  }
  const categories = await api.categories.getAll({ query: { idFather: '0' } }, (err, res) => {
    return res ? res.data : null;
  });

  return { content, serverUrl, categoryId, categories };
};

export default dynamicPage;
