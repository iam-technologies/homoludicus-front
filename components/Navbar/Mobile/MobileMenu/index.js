import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Logout from '../../../Account/Logout';

const MobileMenu = ({ showMenu, mainMenu, isLogin }) => {
  const showLogin = useSelector(state => state.showLogin);
  const { toMyAccount, show } = showLogin;

  const dispatch = useDispatch();

  const menuState = showMenu ? '-open' : '';

  return (
    <div className="mobile-menu-div">
      <div className={`mobile-menu${menuState}`}>
        {mainMenu.map((item) => {
          return (
            <Link key={item.title} href={item.url}>
              <a>
                <p>{item.title}</p>
              </a>
            </Link>
          );
        })}
        <div className="lang-div">
          <p>cat|cast</p>
        </div>
        <div className="mobile-menu-footer">
          <div className="inici-div">
            <Link href="/">
              <a>
                <p>Inici</p>
              </a>
            </Link>
          </div>
          <div className="log-in-out-div">
            {isLogin && (
              <div className="log-out-div">
                <Logout />
              </div>
            )}
            {!isLogin && (
              <div className="log-in-div">
                <Link href="/my-account">
                  <a>
                    <p>iniciar sessió</p>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
