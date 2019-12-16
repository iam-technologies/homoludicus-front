const orderStatusOk = [
  'paymentAccept',
  'readyMRW',
  'readyToPick',
  'inTransitMRW',
  'inTransit',
  'entregado',
  'delivered',
  'sentBill',
  'jointBill'
];

const checkStatusOk = (status) => {
  let check = false;
  status.forEach((elem) => {
    if (orderStatusOk.includes(elem.name)) check = true;
  });
  
  return check;
};

export {
  orderStatusOk,
  checkStatusOk
};
