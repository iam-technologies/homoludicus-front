import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import _get from 'lodash/get';
import CartNavBtn from '../../shoppingCart/CartNavBtn';
import Hamburger from './HamburgerMenu';
import MobileMenu from './MobileMenu';
import MyAccountButton from '../Desktop/MyAccountButton';

const NavBarMobile = (props) => {
    const { mainMenu, isLogin } = props;
    console.log("NavBarMobile -> isLogin", isLogin)
    const [showMenu, setMenu] = useState(false);
    const menuActive = (menuState) => {
        const newMenuState = !menuState;
        return newMenuState;
    };
    const activateMenu = () => {
        setMenu(menu => menuActive(menu));
    };
    const user = useSelector(state => state.user)
    const name = _get(user, 'user.profile.name', '')

    return (
        <>
            <div className="mobile-navbar">
                {!isLogin && (
                    <div className="logo-div">
                        <Link href="/">
                            <a>
                                <img src="/logos/homolud_fond.svg" alt="homoludicus-logo" />
                            </a>
                        </Link>
                    </div>
                )}

                {isLogin && (
                    <>
                        <MyAccountButton />
                        <p>{name}</p>
                    </>
                )}
                <CartNavBtn />
                <Hamburger activateMenu={activateMenu} showMenu={showMenu} />
            </div>
            <MobileMenu showMenu={showMenu} mainMenu={mainMenu} isLogin={isLogin} />
        </>
    );
};

export default NavBarMobile;
