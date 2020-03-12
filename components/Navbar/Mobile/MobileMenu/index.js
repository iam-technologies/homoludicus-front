import React from 'react';
import Link from 'next/link';

const MobileMenu = ({ showMenu, mainMenu }) => {
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
      </div>
    </div>
  );
};

export default MobileMenu;
