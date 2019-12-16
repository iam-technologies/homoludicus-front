import _ from 'lodash';

const texts = {
  product: {
    states: {
      empty: '',
      freeSend: '¡Envío gratis!',
      topSales: 'Top ventas'
    }
  },
  orders: {
    waitPaymentStripe: 'Pago mediante Stripe pendiente',
    waitPayment: 'Pago por transferencia bancaria pendiente',
    waitPaymentPayPal: 'Pago mediante PayPal pendiente',
    waitBudget: 'Presupuesto pendiente',
    budgetSent: 'Presupuesto enviado',
    offlineProducts: 'Productos fuera de línea',
    paymentAccept: 'Pago Aceptado',
    readyMRW: 'Listo para envío MRW',
    readyToPick: 'Listo para Recogida Cliente',
    inTransitMRW: 'En tránsito MRW',
    inTransit: 'En tránsito',
    entregado: 'Entregado',
    delivered: 'Delivered',
    sentBill: 'Factura enviada',
    jointBill: 'Factura Conjunta',
    canceled: 'Cancelado',
    refund: 'Reembolso'
  }
};


const get = (path, text) => _.get(texts, `${path}.${text}`, '');

const getStates = text => _.get(texts, `product.states.${text}`, '');

export default {
  get,
  getStates
};

