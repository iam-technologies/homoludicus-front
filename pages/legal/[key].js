import React from 'react';
import Legal from '../../components/Legal';
import { api } from '../../serverServices';


const legal = ({ serverUrl }) => (

  <div>
    <Legal url={serverUrl} />
  </div>
);

legal.getInitialProps = async ({ isServer, asPath, req }) => {
  const routes = await api.categories.getRoutes('', (err, res) => {
    return res ? res.data : null;
  });

  const serverUrl = isServer ? req.url : asPath;

  return { serverUrl, routes };
};


export default legal;
