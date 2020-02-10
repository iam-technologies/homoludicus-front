import React from 'react';
import Link from 'next/link';
import CartNavBtn from '../../shoppingCart/CartNavBtn';
import CartPopup from '../../shoppingCart/CartPopup';

const NavBarDesktop = (props) => {
  const { mainMenu } = props;

  return (
    <div className="navbar-div">
      <div className="logo-div">
        <Link href="/">
          <a>
            <img src="/logos/homoludicus_logo.png" alt="foodeka-logo" />
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
        <div className="user-icon-div">
          <Link href="/">
            <a>
              <img src="/icon/icon-account.svg" alt="cart" />
            </a>
          </Link>
        </div>
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
