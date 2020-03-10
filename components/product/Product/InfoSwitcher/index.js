/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import _ from 'lodash';

const InfoSwitcher = (props) => {
  const [menuActive, activateMenu] = useState(true);

  const { product } = props;

  const changeMenuState = (menuState) => {
    const newMenuState = !menuState;
    activateMenu(newMenuState);
    return newMenuState;
  };

  const menuClass = menuActive ? 'active' : '';
  const menuClass2 = menuActive ? '' : 'active';

  const onActive = () => {
    activateMenu(menu => changeMenuState(menu));
  };

  const desc = _.get(product, 'longDesc.es', '');

  return (
    <section className="info-switcher">
      <div className="switcher-div">
        <div className="switcher-titles-div">
          <p onClick={onActive}>Descripció</p>
          <p onClick={onActive}>Detalls del producte</p>
        </div>
        <div className="rows-div">
          <span className={`simple-row ${menuClass}`} />
          <span className={`simple-row ${menuClass2}`} />
        </div>
      </div>
      <div className="info-window">
        {menuClass
          ? (
            <p>
              {desc}
            </p>
          )
          : (
            <div>
              __
            </div>
          )
        }
      </div>
    </section>
  );
};

export default InfoSwitcher;
