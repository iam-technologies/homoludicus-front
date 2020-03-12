import React, { useState } from 'react';
import Link from 'next/link';
import CartNavBtn from '../../shoppingCart/CartNavBtn';
import Hamburger from './HamburgerMenu';
import MobileMenu from './MobileMenu';

const NavBarMobile = (props) => {
    const { mainMenu } = props;
    const [showMenu, setMenu] = useState(false);
    const menuActive = (menuState) => {
        const newMenuState = !menuState;
        return newMenuState;
    };
    const activateMenu = () => {
        setMenu(menu => menuActive(menu));
    };

    return (
        <>
            <div className="mobile-navbar">
                <div className="logo-div">
                    <Link href="/">
                        <a>
                            <img src="/logos/homolud_fond.svg" alt="homoludicus-logo" />
                        </a>
                    </Link>
                </div>
                <CartNavBtn />
                <Hamburger activateMenu={activateMenu} showMenu={showMenu} />
            </div>
            <MobileMenu showMenu={showMenu} mainMenu={mainMenu} />
        </>
    );
};

export default NavBarMobile;
