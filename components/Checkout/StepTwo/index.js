import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import geocoder from '../../GoogleMap/helpers/geocoder';
import { AddressBox } from '../../common';
import { dataFormat } from '../../../utils';
import SelectShipping from './SelectShipping';

import infoSource from '../../../utils/infoSource';

export default class StepTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      city: '',
      country: '',
      codePostal: '',
      loaded: true
    };

    this.onChange = props.onChange.bind(this);
    this.onPrevTab = props.onPrevTab.bind(this);
    this.getNewPosition = this.getNewPosition.bind(this);
  }

  componentDidMount() {
    this.getNewPosition();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.active) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    const { loaded } = this.state;

    if (loaded) {
      this.getNewPosition();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.active) {
      const { sendOrderType } = nextProps.item.sendOrderType;
      const { address, city, country, codePostal } = _.get(nextProps.item, 'sendOrder', {});

      if (sendOrderType !== infoSource.companyName) {
        if (prevState.address !== address || prevState.city !== city
          || prevState.country !== country || prevState.codePostal !== codePostal) {
          return {
            address,
            city,
            country,
            codePostal,
            loaded: true
          };
        }
      }
    }

    return null;
  }

  getNewPosition() {
    const { city } = this.state;
    const { onChange } = this.props;

    if (city) {
      geocoder(this.state, (error, res) => {
        if (res) {
          onChange('sendOrder.position', res);
        }

        this.setState({ loaded: false });
      });
    } else {
      this.setState({ loaded: false });
    }
  }


  render() {
    const { item, active } = this.props;

    if (!active) return <div />;

    const shippingType = _.get(item, 'shipping.type', '');

    if (shippingType === 'otherCountry') {
      const shippingPrice = _.get(item, 'shipping.price', 0);
      return (
        <div className="step_shipping">
          <p className="title">Presupuesto de envío</p>
          <div className="select_shipping">
            <div className="box_shipping">
              <div className="description_shipping">
                <p className="title">
                  <span>Envío presupuestado</span>
                  <span className="price">{dataFormat.formatCurrency(shippingPrice)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const sendOrderType = _.get(item, 'sendOrderType');
    const { name, lastname, phone } = sendOrderType === 'anotherPerson'
      ? { name: _.get(item, 'sendOrder.name', ''), lastname: _.get(item, 'sendOrder.lastname', ''), phone: _.get(item, 'sendOrder.phone', '') }
      : { name: _.get(item, 'name', ''), lastname: _.get(item, 'lastname', ''), phone: _.get(item, 'phone', '') };

    const nameComplete = `${name} ${lastname}`;


    return (
      <div className="step_shipping">
        <p className="title">Dirección de envío</p>

        <AddressBox
          hiddenSaveAddress
          address={_.get(item, 'sendOrder', '')}
          name={nameComplete}
          newAddress={{ ..._.get(item, 'newAddress') }}
          onChange={this.onChange}
          onClick={this.onPrevTab}
          phone={phone}
          selected={_.get(item, 'selectedAddress')}
          typeAddress={sendOrderType}
        />

        <SelectShipping
          onChange={this.onChange}
          item={item}
        />

      </div>
    );
  }
}


StepTwo.propTypes = {
  active: PropTypes.bool.isRequired,
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onPrevTab: PropTypes.func.isRequired
};
