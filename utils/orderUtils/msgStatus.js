import _ from 'lodash';
import React from 'react';


// msg status to order.
export default (status, item) => {
  if (status === 'entregado') {
    const { name, lastname } = item.sendOrderType === 'anotherPerson'
      ? { name: _.get(item, 'sendOrder.name', ''), lastname: _.get(item, 'sendOrder.lastname', '') }
      : { name: _.get(item, 'name', ''), lastname: _.get(item, 'lastname', '') };

    return `Entregado a ${name} ${lastname}`;
  }

  if (status === 'paymentAccept') {
    if (_.get(item, 'stripe.idCharge', '') !== '') {
      return <img className="img_cell" src="/images/logo_credit_cards.png" alt="Targeta de crédito" />;
    }

    if (_.get(item, 'paypal.idCharge', '') !== '') {
      return <img className="img_cell" src="/images/logo_paypal.png" alt="PayPal" />;
    }

    return <img className="img_cell" src="/images/logo_wire_transfer.png" alt="Transferencia Bancaria" />;
  }

  if (status === 'waitPayment') return 'Transferencia bancaria pendiente';

  return '';
};
