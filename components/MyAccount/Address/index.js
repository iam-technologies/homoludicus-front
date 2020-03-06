import React from 'react';
import Link from 'next/link';

import { MobileHeader } from '../../common';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import SectionHeader from '../../SectionHeader';

const title='Mis direcciones'
export default () => (
  <section className="app-my_account app-my_address">
    <MobileHeader
      green
      logo
    />
    <SectionHeader title={title} />
    <ShippingAddress />
    <BillingAddress />

    <div className="app-my_account-container link_container">
      <Link href="/my-account">
        <a className="link_return">
          <img src="/images/icon_back_checkout.png" alt="Volver a mi cuenta" />
          <span>Volver a mi cuenta</span>
        </a>
      </Link>
    </div>

  </section>
);
