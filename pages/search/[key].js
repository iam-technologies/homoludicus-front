import React from 'react';

import { Layout } from '../../components';

const search = ({ keyword, serverUrl }) => {
  return (
    <Layout>
      <div>no disponible</div>
      {/* <Search query={keyword} pathname={serverUrl} /> */}
    </Layout>
  );
};

search.getInitialProps = async ({ query, isServer, asPath, req }) => {
  const { key = '' } = query;

  const serverUrl = isServer ? req.url : asPath;

  return { keyword: key, serverUrl };
};

export default search;
