import Link from 'next/link';
import React from 'react';

import CartNavBtn from '../../../shoppingCart/CartNavBtn';
import MyAccountButton from './MyAccountButton';


export default ({ onCloseNav, pathname }) => (
  <div className="nav_footer">
    <CartNavBtn
      text="Mi Carrito"
      className="nav_footer-btn_cart"
      onCloseNav={onCloseNav}
    />

    <div className="nav_footer-btns_bottom">
      <Link
        onClick={onCloseNav}
        className="nav_footer-btns"
        href="/"
      >
        <a className="nav_footer-btns">Inicio</a>
      </Link>

      <MyAccountButton onCloseNav={onCloseNav} pathname={pathname} />
    </div>
  </div>
);
