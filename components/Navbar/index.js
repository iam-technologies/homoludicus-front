import React, { Component, Fragment } from 'react';
import mainMenu from './mainMenu';

import { isClient } from '../../serverServices/utils';
import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import NavbarDesktop from './Desktop';
import NavbarMobile from './Mobile';

import { useSelector } from 'react-redux'


const Navbar = (props) => {
  const { screen, pathname } = props;


  const isLogin = useSelector(state => state.isLogin.login)
  console.log(isLogin)

  if (screen === 'lg') {

    return (
      <NavbarDesktop mainMenu={mainMenu} isLogin={isLogin} />
    );
  }

  return (
    <>
      {isClient && (
        <NavbarMobile mainMenu={mainMenu} isLogin={isLogin} />
      )}
    </>
  );

};

export default withWindowResize(Navbar);
