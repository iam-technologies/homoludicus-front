import React from 'react';
import { Link } from '../../../routes';

import { MobileHeader } from '../../common';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';


export default () => (
  <section className="app-my_account app-my_address">
    <MobileHeader
      green
      logo
    />

    <ShippingAddress />
    <BillingAddress />

    <div className="app-my_account-container link_container">
      <Link route="/my-account">
        <a className="link_return">
          <img src="../../../static/images/icon_back_checkout.png" alt="Volver a mi cuenta" />
          <span>Volver a mi cuenta</span>
        </a>
      </Link>
    </div>

  </section>
);
