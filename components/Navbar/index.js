import React, { Component, Fragment } from 'react';
import mainMenu from './mainMenu';

import { isClient } from '../../serverServices/utils';
import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import NavbarDesktop from './Desktop';
import NavbarMobile from './Mobile';


const Navbar = (props) => {
  const { screen, pathname } = props;

  if (screen === 'lg') {

    return (
      <NavbarDesktop mainMenu={mainMenu} />
    );
  }

  return (
    <>
      {isClient && (
        <NavbarMobile mainMenu={mainMenu} />
      )}
    </>
  );

};

export default withWindowResize(Navbar);
