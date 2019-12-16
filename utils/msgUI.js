import _ from 'lodash';

const msgUI = {
  text: { required: 'Campo obligatorio.' },
  account: { login_error: 'El email o la contraseña no son válidos.' },
  select: {
    notAllowed: 'Valor no permitido',
    required: 'Campo obligatorio.'
  },
  discount: {
    'invalid-key': 'Código introducido no válido',
    expired: 'Código introducido caducado',
    limit: 'Código introducido ha alcanzado su límite',
    'limit-user': 'Su usuario no puede usar el código más veces'
  },
  general: {
    formIncomplete: 'Hay errores en algunos campos, necesitan ser revisados.',
    profileSuccess: 'Sus datos se han actualizado.',
    profileError: 'No ha sido posible actualizar sus datos, inténtelo de nuevo.',
    passwordError: 'No ha sido posible actualizar su contraseña',
    passwordSuccess: 'Su contraseña ha sido modificada, debe iniciar sessión de nuevo.',
    addressRemoveSuccess: 'La dirección ha sido eliminada.',
    addressRemoveError: 'No ha sido posible eliminar la dirección.'
  },
  email: {
    'already-exists': 'Este email ya tiene una cuenta creada',
    regEx: 'El email no es válido',
    required: 'El correo electrónico es un campo obligatorio.',
    'not-found': 'No existe un usuario registrado con este email.',
    'already-send': 'Este email ya está en la lista',
  },
  role: { required: 'Es obligatorio indicar un rol al usuario' },
  password: {
    'too-short': 'La contraseña debe tener mínimo 6 caracteres.',
    invalid: 'La contraseña no puede contener espacios.',
    required: 'La contraseña es un campo obligatorio.',
    'token-expired': 'El token ha caducado.',
    sameOldPassword: 'La nueva contraseña no puede ser igual a la anterior.'
  },
  token: { invalid: 'El token no es válido o ha caducado.' },
  phone: {
    required: 'Campo obligatorio.',
    'too-short': 'El teléfono debe tener mínimo 9 números.'
  },
  shipping: { required: 'Debe elegir un medio de transporte para el envío de su pedido.' },
  payment: {
    required: 'Debe elegir si es un usuario particular o una empresa para continuar con el pedido.',
    method: 'Se debe elegir un método de pago para procesar el pedido.'
  },
  creditCard: {
    card_declined: 'Su tarjeta ha sido rechazada. Póngase en contacto con su banco o pruebe con otra tarjeta o forma de pago.',
    expired_card: 'Su tarjeta está caducada. Verifique que la fecha de vencimiento sea correcta o use otra tarjeta.',
    incomplete_cvc: 'Código de seguridad incompleto',
    incomplete_expiry: 'Fecha de caducidad incompleta',
    incomplete_number: 'Número de tarjeta incompleto. Revise los dígitos introducidos o use otra tarjeta.',
    incorrect_cvc: 'Código CVC incorrecto. Revise los dígitos de seguridad en el reverso de la tarjeta',
    invalid_expiry_year_past: 'La fecha de validez de su tarjeta ha expirado',
    invalid_number: 'Número de tarjeta erróneo. Verifique que el número introducido sea correcto o use otra tarjeta',
    processing_error: 'Hubo un error durante el proceso. Si este persiste, póngase en contacto con nosotros'
  },
  acceptTerms: { required: 'Debe aceptar los términos de servicio para completar la compra' },
  checkout: { success: 'La compra se ha realizado con éxito, en su correo tiene toda la información.' },
  order_validation: {
    'invalid-email': 'Hubo un error durante el proceso, el email no es válido.',
    'invalid-personal-info': 'Hubo un error durante el proceso, datos personales incompletos.',
    'invalid-send-address': 'Hubo un error durante el proceso, dirección de envío incompleta.',
    'invalid-order': 'Hubo un error durante el proceso, no se ha podido realizar el pedido.',
    'shipping-required': 'Hubo un error durante el proceso, se debe seleccionar un medio de transporte.',
    'invalid-token': 'Hubo un error durante el proceso, la compra no se ha podido completar.',
    'customer-invalid-parameter': 'Hubo un error durante el proceso, la compra no se ha podido completar.',
    'fail-payment-card': 'Hubo un error durante el proceso, la compra no se ha podido completar.'
  }
};


const get = (errors, name, path = '') => {
  if (errors.length < 1) return '';
  const error = errors.filter(e => e.name === name);
  if (error.length < 1) return '';

  const newError = error[0];
  const keyFather = path !== '' ? path : newError.path;
  const textSearch = `${keyFather || name}.${newError.type}`;

  return _.get(msgUI, textSearch, '');
};

const getText = name => _.get(msgUI, name, '');


const removeError = (errors, name) => {
  if (errors.length > 0) {
    _.remove(errors, elem => elem.name === name);
  }

  return errors;
};


export default {
  get,
  getText,
  removeError
};
