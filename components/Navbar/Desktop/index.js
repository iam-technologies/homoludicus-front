import React from 'react';
import Link from 'next/link';
import CartNavBtn from '../../shoppingCart/CartNavBtn';
import CartPopup from '../../shoppingCart/CartPopup';
import MyAccountButton from './MyAccountButton';

const NavBarDesktop = (props) => {
  const { mainMenu, isLogin, name } = props;

  return (
    <div className="navbar-div">
      <div className="logo-div">
        <Link href="/">
          <a>
            <img src="/logos/homolud_fond.svg" alt="homoludicus-logo" />
          </a>
        </Link>
      </div>
      <div className="nav-items">
        {mainMenu.map((item) => {
          return (
            <Link key={item.title} href={item.url}>
              <a>
                <p>{item.title}</p>
              </a>
            </Link>
          );
        })}
        <div className="cart-icon">
          <CartNavBtn />
        </div>
        <MyAccountButton />
        {isLogin && (
          <p className="name">{name}</p>
        )}
        <div className="lang-div">
          <p>cat</p>
          <p className="vertical-lign">|</p>
          <p>esp</p>
        </div>
        <CartPopup />
      </div>
    </div>
  );
};

export default NavBarDesktop;
