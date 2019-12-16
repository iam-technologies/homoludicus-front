import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React from 'react';

import { MobileHeader } from '../common';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';


const Account = (props) => {
  const { location: { pathname }, isLogin } = props;

  if (isLogin) return (<Redirect to="/" />);


  return (
    <section className="app_account">
      <MobileHeader
        green
        logo
      />

      {
        pathname.indexOf('/forgot-password') !== -1 && <ForgotPassword {...props} />
      }
      {
        pathname.indexOf('/reset-password') !== -1 && <ResetPassword {...props} />
      }
    </section>
  );
};


export default connect(state => ({ isLogin: state.isLogin.login }))(Account);
