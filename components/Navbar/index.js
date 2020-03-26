import React, { Component, Fragment } from 'react';
import mainMenu from './mainMenu';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import { isClient } from '../../serverServices/utils';
import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import NavbarDesktop from './Desktop';
import NavbarMobile from './Mobile';

const Navbar = (props) => {
  const { screen, pathname } = props;

  const user = useSelector(state => state.user)
  const name = _get(user, 'user.profile.name', '')
  const isLogin = useSelector(state => state.isLogin.login)

  if (screen === 'lg') {

    return (
      <NavbarDesktop mainMenu={mainMenu} isLogin={isLogin} name={name} />
    );
  }

  return (
    <>
      {isClient && (
        <NavbarMobile mainMenu={mainMenu} isLogin={isLogin} name={name} />
      )}
    </>
  );

};

export default withWindowResize(Navbar);
