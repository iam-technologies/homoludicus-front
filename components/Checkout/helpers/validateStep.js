import _ from 'lodash';
import Alert from 'react-s-alert';
import infoSource from '../../../utils/infoSource';

import { checkFields, msgUI } from '../../../utils';


const validateStepOne = (item, callback) => {
  const newItem = { ...item };
  const errors = [];
  const orderType = _.get(newItem, 'sendOrderType', '');

  if (orderType !== '') {
    errors.push(
      ...checkFields.isValidEmail(_.get(newItem, 'email', ''), 'email'),
      ...checkFields.isRequired(_.get(newItem, 'name', ''), 'name'),
      ...checkFields.isRequired(_.get(newItem, 'lastname', ''), 'lastname'),
      ...checkFields.isValidPhone(_.get(newItem, 'phone', ''), 'phone')
    );

    if (orderType === 'anotherPerson') {
      errors.push(
        ...checkFields.isRequired(_.get(newItem, 'sendOrder.name', ''), 'sendOrder.name'),
        ...checkFields.isRequired(_.get(newItem, 'sendOrder.lastname', ''), 'sendOrder.lastname'),
        ...checkFields.isValidPhone(_.get(newItem, 'sendOrder.phone', ''), 'sendOrder.phone')
      );

      if (_.get(newItem, 'sendOrder.showDedication', false)) {
        errors.push(...checkFields.isRequired(_.get(newItem, 'sendOrder.message', ''), 'sendOrder.message'));
      }
    }

    if (orderType === 'myAddress' || orderType === 'anotherPerson') {
      const country = _.get(newItem, 'sendOrder.country', '');

      switch (country) {
        case 'España': {
          errors.push(...checkFields.isRequired(_.get(newItem, 'sendOrder.state', ''), 'sendOrder.state'));
          delete newItem.sendOrder.countryName;
          break;
        }
        case 'Otros': {
          errors.push(
            ...checkFields.isRequired(_.get(newItem, 'sendOrder.countryName', ''), 'sendOrder.countryName'),
            ...checkFields.isRequired(_.get(newItem, 'deliveryPeriod', ''), 'deliveryPeriod')
          );

          delete newItem.sendOrder.state;
          break;
        }

        default: {
          if (newItem.sendOrder) {
            delete newItem.sendOrder.countryName;
            delete newItem.sendOrder.state;
            delete newItem.sendOrder.deliveryPeriod;
          }
        }
      }

      errors.push(
        ...checkFields.isRequired(_.get(newItem, 'sendOrder.address', ''), 'sendOrder.address'),
        ...checkFields.isRequired(country, 'sendOrder.country'),
        ...checkFields.isRequired(_.get(newItem, 'sendOrder.city', ''), 'sendOrder.city'),
        ...checkFields.isRequired(_.get(newItem, 'sendOrder.codePostal', ''), 'sendOrder.codePostal')
      );
    }
  }

  if (errors.length > 0) return callback(errors, null);
  // If there aren't errors
  if (orderType === infoSource.companyName) {
    delete newItem.sendOrder;
    delete newItem.shipping;
  }

  if (orderType === 'myAddress') {
    delete newItem.sendOrder.name;
    delete newItem.sendOrder.lastname;
    delete newItem.sendOrder.showDedication;
    delete newItem.sendOrder.message;
  }

  return callback(null, newItem);
};


const validateStepTwo = (item, callback) => {
  const shippingType = _.get(item, 'shipping.type', '');

  if (!shippingType) {
    const error = [{ path: 'shipping', type: 'required', name: 'shipping.type' }];
    Alert.warning(msgUI.get(error, 'shipping.type'));

    return callback(error, null);
  }

  return callback(null, item);
};


const validateStepThree = (item, callback) => {
  const newItem = { ...item };
  const errors = [];
  const paymentType = _.get(newItem, 'paymentType', '');
  const paymentMethod = _.get(newItem, 'paymentMethod', '');
  const acceptTerms = _.get(newItem, 'acceptTerms', false);

  if (!paymentType) {
    const error = [{ path: 'payment', type: 'required', name: 'paymentType' }];
    Alert.warning(msgUI.get(error, 'paymentType'));

    return callback(error, null);
  }

  if (!acceptTerms) {
    const error = [{ path: 'acceptTerms', type: 'required', name: 'acceptTerms' }];
    errors.push(...error);

    Alert.warning(msgUI.get(error, 'acceptTerms'));

    return callback(errors, null);
  }

  if (paymentType === 'business') {
    errors.push(
      ...checkFields.isRequired(_.get(newItem, 'paymentInfo.name', ''), 'paymentInfo.name'),
      ...checkFields.isRequired(_.get(newItem, 'paymentInfo.cif', ''), 'paymentInfo.cif'),
      ...checkFields.isRequired(_.get(newItem, 'paymentInfo.address', ''), 'paymentInfo.address'),
      ...checkFields.isRequired(_.get(newItem, 'paymentInfo.country', ''), 'paymentInfo.country'),
      ...checkFields.isRequired(_.get(newItem, 'paymentInfo.city', ''), 'paymentInfo.city'),
      ...checkFields.isRequired(_.get(newItem, 'paymentInfo.codePostal', ''), 'paymentInfo.codePostal'),
      ...checkFields.isValidPhone(_.get(newItem, 'paymentInfo.phone', ''), 'paymentInfo.phone')
    );
  } else {
    delete newItem.paymentInfo;
  }

  if (!paymentMethod || !/card|wireTransfer|paypal/.test(paymentMethod)) {
    const error = [{ path: 'payment', type: 'method', name: 'paymentMethod' }];
    Alert.warning(msgUI.get(error, 'paymentMethod'));

    return callback(error, null);
  }

  if (paymentMethod === 'card') {
    errors.push(...checkFields.isRequired(_.get(newItem, 'paymentMethodInfo.name', ''), 'paymentMethodInfo.name'));
  }

  if (errors.length > 0) {
    Alert.warning(msgUI.getText('general.formIncomplete'));

    return callback(errors, null);
  }

  return callback(null, newItem);
};


const validateStep = (item, indexTab, callback) => {
  if (indexTab === 1) return validateStepTwo(item, callback);

  if (indexTab === 2) return validateStepThree(item, callback);

  return validateStepOne(item, callback);
};


export default validateStep;
