import React from 'react';
import { Link } from '../../../routes';

const NavBarDesktop = () => {
  return (
    <div className="navbar-div">
      <div className="logo-div">
        <Link href="/">
          <a>
            <img src="/logos/foodeka_horizontal.svg" alt="foodeka-logo" />
          </a>
        </Link>
      </div>
      <div className="nav-items">
        <Link href="/about">
          <a>
            <p>Qui som</p>
          </a>
        </Link>
        <Link href="/shop">
          <a>
            <p>Botiga online</p>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <p>Activitats</p>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <p>Serveis</p>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <p>Contacte</p>
          </a>
        </Link>
        <div className="cart-icon">
          <Link href="/">
            <a>
              <img src="/icon/shopping-cart.svg" alt="cart" />
            </a>
          </Link>
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
      </div>
    </div>
  );
};

export default NavBarDesktop;
