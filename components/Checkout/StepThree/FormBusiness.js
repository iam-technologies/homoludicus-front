import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { msgUI, espProvincies, countries } from '../../../utils';
import { TextInput, AddressBillingBox } from '../../common';
import SelectInputBis from '../../common/SelectInputBis';
import SelectAddressBis from '../../common/SelectAddressBis';


export default class FormBusiness extends Component {
  constructor(props) {
    super(props);

    this.provincies = espProvincies.map(el => el.nm).sort();

    this.onChange = props.onChange.bind(this);
    this.getFieldsOrAddress = this.getFieldsOrAddress.bind(this);
  }

  getFieldsOrAddress(address) {
    const { item, errors } = this.props;

    const newBillAddress = _.get(item, 'newBillAddress', true);
    const selectedBillAddress = _.get(item, 'selectedBillAddress', '');

    if (!newBillAddress) {
      const error = errors.filter(elem => elem.name.includes('paymentInfo'));

      return (
        <React.Fragment>
          { error.length > 0 && <p className="msg-error">Dirección incompleta, por favor elija otra.</p> }
          <AddressBillingBox
            hiddenBtnChange
            hiddenSaveAddress
            address={_.get(item, 'paymentInfo', {})}
          />
        </React.Fragment>
      );
    }

    if (address.length > 0 && !selectedBillAddress) return null;


    const country = _.get(item, 'paymentInfo.country', '');

    return (
      <div className="step_payment-business_info">
        <TextInput
          error={msgUI.get(errors, 'paymentInfo.name')}
          hintLabel="Razón social"
          label="Razón social"
          onChange={this.onChange}
          path="paymentInfo.name"
          value={_.get(item, 'paymentInfo.name', '')}
        />

        <TextInput
          error={msgUI.get(errors, 'paymentInfo.cif')}
          hintLabel="CIF / DNI"
          label="CIF / DNI"
          onChange={this.onChange}
          path="paymentInfo.cif"
          value={_.get(item, 'paymentInfo.cif', '')}
        />

        <TextInput
          maxWidth
          error={msgUI.get(errors, 'paymentInfo.address')}
          hintLabel="Dirección de facturación"
          label="Dirección de facturación"
          onChange={this.onChange}
          path="paymentInfo.address"
          value={_.get(item, 'paymentInfo.address', '')}
        />

        <SelectInputBis
          className="select_input"
          error={msgUI.get(errors, 'paymentInfo.country')}
          items={countries}
          label="País"
          onChange={this.onChange}
          path="paymentInfo.country"
          value={_.get(item, 'paymentInfo.country', '')}
        />

        {
          country === 'España' && (
            <SelectInputBis
              className="select_input"
              error={msgUI.get(errors, 'paymentInfo.state')}
              items={this.provincies}
              label="Provincia"
              onChange={this.onChange}
              path="paymentInfo.state"
              value={_.get(item, 'paymentInfo.state', '')}
            />
          )
        }

        {
          country === 'Otros' && (
            <TextInput
              error={msgUI.get(errors, 'paymentInfo.countryName')}
              hintLabel="Nombre del País"
              label="Nombre del País"
              onChange={this.onChange}
              path="paymentInfo.countryName"
              value={_.get(item, 'paymentInfo.countryName', '')}
            />
          )
        }

        <TextInput
          error={msgUI.get(errors, 'paymentInfo.city')}
          hintLabel="Ciudad"
          label="Ciudad"
          onChange={this.onChange}
          path="paymentInfo.city"
          value={_.get(item, 'paymentInfo.city', '')}
        />

        <TextInput
          error={msgUI.get(errors, 'paymentInfo.codePostal')}
          hintLabel="Código postal"
          label="Código postal"
          onChange={this.onChange}
          path="paymentInfo.codePostal"
          value={_.get(item, 'paymentInfo.codePostal', '')}
        />

        <TextInput
          error={msgUI.get(errors, 'paymentInfo.phone')}
          hintLabel="Teléfono de contacto"
          label="Teléfono de contacto"
          onChange={this.onChange}
          path="paymentInfo.phone"
          value={_.get(item, 'paymentInfo.phone', '')}
        />
      </div>
    );
  }

  render() {
    const { item, user } = this.props;
    let address = [];

    if (user) {
      const { paymentInfo, otherPaymentInfo } = user.profile;

      address = paymentInfo ? [paymentInfo] : [];
      address = otherPaymentInfo ? [...address, ...otherPaymentInfo] : address;
    }

    return (
      <div className="container_send_addres">
        {
          address.length > 0 ? (
            <SelectAddressBis
              items={address}
              label="Seleccionar una dirección de facturación"
              onChange={this.onChange}
              path="paymentInfo"
              value={_.get(item, 'selectedBillAddress', '')}
              selectedAddress="selectedBillAddress"
            />
          ) : null
        }

        {
          this.getFieldsOrAddress(address)
        }
      </div>
    );
  }
}


FormBusiness.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired
};
