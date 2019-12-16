import { StripeProvider, Elements } from 'react-stripe-elements';
import React from 'react';

import settings from '../../../../../settings';
import CreditCardForm from './CreditCardForm';


export default props => (
  <StripeProvider apiKey={settings.stripeApiKey}>
    <Elements>
      <CreditCardForm
        {...props}
      />
    </Elements>
  </StripeProvider>
);
