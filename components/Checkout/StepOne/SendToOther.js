import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { msgUI, espProvincies, countries } from '../../../utils';
import {
  TextInput, CheckInput, TextArea, AddressBox
} from '../../common';

import SelectInputBis from '../../common/SelectInputBis';
import SelectAddressBis from '../../common/SelectAddressBis';

export default class SendToOther extends Component {
  constructor(props) {
    super(props);

    this.provincies = espProvincies.map(el => el.nm).sort();

    // this.onChange = props.onChange.bind(this);
    this.getFieldsOrMap = this.getFieldsOrMap.bind(this);
  }

  // "showAllField" true in case send to another person false incase send to my adress
  getFieldsOrMap(address, completeName, name, lastname) {
    const { item, showAllField, errors, disabled, onChange } = this.props;

    const newAddress = _.get(item, 'newAddress', true);

    if (!newAddress && _.get(item, 'sendOrderType') === 'myAddress') {
      return (
        <AddressBox
          hiddenBtnChange
          hiddenSaveAddress
          address={_.get(item, 'sendOrder', '')}
          name={showAllField ? `${name} ${lastname}` : `${_.get(item, 'name', '')} ${_.get(item, 'lastname', '')}`}
          phone={showAllField ? _.get(item, 'sendOrder.phone', '') : _.get(item, 'phone', '')}
        />
      );
    }

    if (!showAllField && address.length > 0 && _.get(item, 'selectedAddress', '') === '' && !disabled) return null;

    const country = _.get(item, 'sendOrder.country', '');

    return (
      <Fragment>
        <TextInput
          error={msgUI.get(errors, 'sendOrder.address')}
          hintLabel={`Dirección ${completeName}`}
          label={`Dirección ${completeName}`}
          maxWidth
          onChange={onChange}
          path="sendOrder.address"
          value={_.get(item, 'sendOrder.address', '')}
          disabled={disabled}
        />

        <SelectInputBis
          className="select_input"
          error={msgUI.get(errors, 'sendOrder.country')}
          items={countries}
          label="País"
          onChange={onChange}
          path="sendOrder.country"
          value={country}
          disabled={disabled}
        />

        {
          country === 'España' && (
            <SelectInputBis
              className="select_input"
              error={msgUI.get(errors, 'sendOrder.state')}
              items={this.provincies}
              label="Provincia"
              onChange={onChange}
              path="sendOrder.state"
              value={_.get(item, 'sendOrder.state', '')}
              disabled={disabled}
            />
          )
        }

        {
          country === 'Otros' && (
            <TextInput
              error={msgUI.get(errors, 'sendOrder.countryName')}
              hintLabel="Nombre del País"
              label="Nombre del País"
              onChange={onChange}
              path="sendOrder.countryName"
              value={_.get(item, 'sendOrder.countryName', '')}
              disabled={disabled}
            />
          )
        }

        <TextInput
          error={msgUI.get(errors, 'sendOrder.city')}
          hintLabel="Ciudad"
          label="CIUDAD"
          onChange={onChange}
          path="sendOrder.city"
          value={_.get(item, 'sendOrder.city', '')}
          disabled={disabled}
        />

        <TextInput
          error={msgUI.get(errors, 'sendOrder.codePostal')}
          hintLabel="Código Postal"
          label="Código Postal"
          onChange={onChange}
          path="sendOrder.codePostal"
          value={_.get(item, 'sendOrder.codePostal', '')}
          disabled={disabled}
        />
      </Fragment>
    );
  }


  render() {
    const { item, errors, showAllField, user, disabled, onChange } = this.props;

    const name = _.get(item, 'sendOrder.name', '');
    const lastname = _.get(item, 'sendOrder.lastname', '');
    let completeName = '';

    if (showAllField) {
      completeName = name ? `de ${name} ${lastname}` : '';
    }

    const address = _.get(user, 'profile.address', []);

    return (
      <div className="container_send_addres">
        {
          !showAllField ? null : (
            <Fragment>
              <TextInput
                error={msgUI.get(errors, 'sendOrder.name')}
                hintLabel="Nombre de la persona que recibirá el envío"
                label="NOMBRE DE LA PERSONA QUE RECIBIRÁ EL ENVÍO"
                onChange={onChange}
                path="sendOrder.name"
                value={name}
                disabled={disabled}
              />

              <TextInput
                error={msgUI.get(errors, 'sendOrder.lastname')}
                hintLabel="Apellidos de la persona que recibirá el envío"
                label="APELLIDOS DE LA PERSONA QUE RECIBIRÁ EL ENVÍO"
                onChange={onChange}
                path="sendOrder.lastname"
                value={lastname}
                disabled={disabled}
              />
            </Fragment>
          )
        }

        {
          !showAllField && address.length > 0 && !disabled ? (
            <SelectAddressBis
              items={address}
              label="Seleccionar una dirección de envío"
              onChange={onChange}
              path="sendOrder"
              value={_.get(item, 'selectedAddress', '')}
              selectedAddress="selectedAddress"
            />
          ) : null
        }

        {
          this.getFieldsOrMap(address, completeName, name, lastname)
        }

        {
          !showAllField ? null : (
            <TextInput
              error={msgUI.get(errors, 'sendOrder.phone')}
              hintLabel={`Teléfono de contacto ${completeName}`}
              label={`Teléfono de contacto ${completeName}`}
              onChange={onChange}
              path="sendOrder.phone"
              value={_.get(item, 'sendOrder.phone', '')}
              disabled={disabled}
            />
          )
        }

        {
          _.get(item, 'sendOrder.country', '') === 'Otros' && (
            <TextInput
              error={msgUI.get(errors, 'deliveryPeriod')}
              hintLabel="Plazo de entrega"
              label="Plazo de entrega"
              onChange={onChange}
              path="deliveryPeriod"
              value={_.get(item, 'deliveryPeriod', '')}
              disabled={disabled}
            />
          )
        }

        <TextArea
          hintLabel="Escribe aquí tus observaciones sobre el envío..."
          label="OBSERVACIONES SOBRE EL ENVÍO"
          maxWidth
          onChange={onChange}
          path="sendOrder.comment"
          value={_.get(item, 'sendOrder.comment', '')}
          disabled={disabled}
        />

        {
          !showAllField ? null : (
            <Fragment>
              <CheckInput
                className="check_dedication"
                label="Escribir una dedicatoria"
                path="sendOrder.showDedication"
                onChange={onChange}
                value={_.get(item, 'sendOrder.showDedication', false)}
                disabled={disabled}
              />

              {
                _.get(item, 'sendOrder.showDedication', false) || (disabled && _.get(item, 'sendOrder.message', false)) ? (
                  <TextArea
                    error={msgUI.get(errors, 'sendOrder.message')}
                    hintLabel="Escribe aquí tu dedicatoría..."
                    label="DEDICATORIA"
                    maxWidth
                    onChange={onChange}
                    path="sendOrder.message"
                    value={_.get(item, 'sendOrder.message', '')}
                    disabled={disabled}
                  />
                ) : null
              }
            </Fragment>
          )
        }

      </div>
    );
  }
}


SendToOther.propTypes = {
  errors: PropTypes.array,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  showAllField: PropTypes.bool,
  user: PropTypes.object
};

SendToOther.defaultProps = {
  errors: {},
  showAllField: false,
  user: undefined
};
