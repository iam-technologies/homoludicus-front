import React from 'react';

const Hamburger = ({ activateMenu, showMenu }) => {
    const xClass = showMenu ? '-change' : '';

    return (
        <>
            <div className="hamburger-div" id="menuToggle" onClick={activateMenu}>
                <div className={`bar1 bar1${xClass}`} />
                <div className={`bar2 bar2${xClass}`} />
                <div className={`bar3 bar3${xClass}`} />
            </div>
        </>
    );
};

export default Hamburger;
