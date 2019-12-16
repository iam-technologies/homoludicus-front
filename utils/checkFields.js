import Alert from 'react-s-alert';
import msgUI from './msgUI';

const regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

const isRequired = (field, name = '') => {
  if (!field || field.replace(/\s/g, '') === '') return [{ path: 'text', type: 'required', name }];

  return [];
};

const isValidPassword = (password, name = '') => {
  if (!password) return [{ path: 'password', type: 'required', name }];

  if (/\s/.test(password)) return [{ path: 'password', type: 'invalid', name }];

  if (password.length < 6) return [{ path: 'password', type: 'too-short', name }];

  return [];
};

const isSamePassword = (password, oldPassword, namePassword = '', nameOldPassword = '') => {
  const errors = [
    ...isValidPassword(oldPassword, nameOldPassword),
    ...isValidPassword(password, namePassword)
  ];

  if (errors.length === 0 && password === oldPassword) {
    return [{ path: 'password', type: 'sameOldPassword', name: namePassword }];
  }

  return errors;
};

const isValidEmail = (email, name = '') => {
  if (!email || email.replace(/\s/g, '') === '') return [{ path: 'email', type: 'required', name }];

  if (!regExEmail.test(email)) return [{ path: 'email', type: 'regEx', name }];

  return [];
};

const isValidPhone = (field, name = '') => {
  if (!field || field.replace(/\s/g, '') === '') return [{ path: 'phone', type: 'required', name }];

  if (field.length < 9) return [{ path: 'phone', type: 'too-short', name }];

  return [];
};

const validatePassAndEmail = ({ email, password }) => {
  const errors = [];

  errors.push(...isValidEmail(email));

  errors.push(...isValidPassword(password));

  return errors;
};


const validateCreditCard = (e) => {
  if (e.error) {
    let name = 'creditCardNumber';
    const { code } = e.error;

    if (code.indexOf('cvc') !== -1) name = 'creditCardCCV';
    if (code.indexOf('expiry') !== -1) name = 'creditCardExpiry';

    if (code.indexOf('processing_error') !== -1) {
      const error = [{ path: 'creditCard', type: code, name: 'creditCard' }];

      Alert.warning(msgUI.get(error, 'creditCard'));

      return [];
    }

    return [{ path: 'creditCard', type: code, name }];
  }

  return [];
};


export default {
  isRequired,
  isSamePassword,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  validateCreditCard,
  validatePassAndEmail
};
