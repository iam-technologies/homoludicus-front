import React from 'react';

import { Search, Layout } from '../../components';

const search = ({ keyword, serverUrl }) => {
  return (
    <Layout>
      <Search query={keyword} pathname={serverUrl} />
    </Layout>
  );
};

search.getInitialProps = async ({ query, isServer, asPath, req }) => {
  const { key = '' } = query;

  const serverUrl = isServer ? req.url : asPath;

  return { keyword: key, serverUrl };
};

export default search;
