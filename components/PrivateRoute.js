import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import api from '../serverServices/api';
import { isLoginActs, userActs } from '../redux/actions';

const { change } = isLoginActs;
const { getUser } = userActs;

const PrivateRoute = ({ isLogin, isServer, change, getUser, children }) => {
  const [isClient, setclient] = useState(!isServer);

  useEffect(() => {
    if (isLogin) return;

    api.account.onLogin((error, resLogin) => {
      if (!resLogin) return Router.push('/');

      change(resLogin || !error);

      if (resLogin) getUser();
      setclient(true);
    });
  }, []);

  if (!isClient) return <div>loading...</div>; // TODO

  return children;
};

function mapStateToProps(state) {
  const { isLogin: { login } } = state;

  return { isLogin: login };
}

export default connect(mapStateToProps, { change, getUser })(PrivateRoute);
