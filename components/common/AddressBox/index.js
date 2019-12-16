import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { userActs } from '../../../redux/actions';
import { api } from '../../../serverServices';
import GoogleMap from '../../GoogleMap';


class AddressBox extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.onUser = bindActionCreators(userActs, props.dispatch);
    this.onClick = props.onClick.bind(this);
    this.onSaveAddress = this.onSaveAddress.bind(this);
    this.onRemove = props.onRemove.bind(this);
  }


  onSaveAddress() {
    const { loading } = this.state;
    const { address, user, newAddress, selected, onChange } = this.props;
    const userProfile = _.get(user, 'profile', '');

    if (userProfile !== '' && !loading) {
      this.setState({ loading: true });

      if (!userProfile.address) userProfile.address = [];

      if (userProfile.address.length === 0 || newAddress) {
        userProfile.address.push(address);

        onChange('newAddress', 'false');
        onChange('selectedAddress', userProfile.address.length - 1);
      } else {
        userProfile.address[selected] = address;
      }

      api.users.updateById({ ...user, profile: userProfile }, () => {
        this.setState({ loading: false });

        this.onUser.getUser();
      });
    }
  }

  getAddressLine2(address) {
    const country = _.get(address, 'country', '');
    const city = _.get(address, 'city', '');

    if (country === 'Otros') {
      return `${_.get(address, 'countryName', '')}, ${city}`;
    }

    if (country === 'Portugal') {
      return `${country}, ${city}`;
    }

    return `${_.get(address, 'state', '')}, ${country}`;
  }

  getAddressLine3(address) {
    const country = _.get(address, 'country', '');
    const codePostal = _.get(address, 'codePostal', '');
    const city = _.get(address, 'city', '');

    if (country !== 'España') return codePostal;

    return `${codePostal}, ${city}`;
  }


  render() {
    const { loading } = this.state;
    const {
      hiddenBtnChange, hiddenSaveAddress, address, name, phone, user, showRemove
    } = this.props;

    const position = _.get(address, 'position', {});


    return (
      <div className="address_box_map">
        <div className="flex_item address">
          <div>
            <p>{name}</p>

            <p>{_.get(address, 'address', '')}</p>

            <p>{this.getAddressLine2(address)}</p>

            <p>{this.getAddressLine3(address)}</p>

            <p>Tel: {phone}</p>
          </div>

          <div className="last_btns">
            {
              hiddenBtnChange ? null
                : (
                  <button
                    type="button"
                    className="btn_address"
                    onClick={this.onClick}
                  >Cambiar Dirección
                                    </button>
                )
            }
            {
              !hiddenSaveAddress && user ? (
                <Fragment>
                  <img src="/images/icon_oval_address.png" alt="*" />

                  <button
                    type="button"
                    className="btn_address"
                    onClick={this.onSaveAddress}
                  >{loading ? 'Guardando...' : 'Guardar dirección'}
                  </button>
                </Fragment>
              ) : null
            }
            {
              !showRemove ? null : (
                <Fragment>
                  <img src="/images/icon_oval_address.png" alt="*" />

                  <button
                    type="button"
                    className="btn_address"
                    onClick={this.onRemove}
                  >Eliminar dirección
                  </button>
                </Fragment>
              )
            }

          </div>
        </div>

        <div className="flex_item shipping_map">
          {
            position && position.lat && position.lng ? (
              <GoogleMap
                isMarkerShown
                position={position}
                zoom={18}
              />
            ) : null
          }
        </div>
      </div>
    );
  }
}

AddressBox.propsTypes = {
  address: PropTypes.object.isRequired,
  hiddenBtnChange: PropTypes.bool,
  name: PropTypes.string,
  newAddress: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  onSaveAddress: PropTypes.func,
  phone: PropTypes.string,
  selected: PropTypes.any,
  showRemove: PropTypes.bool,
  typeAddress: PropTypes.string,
  user: PropTypes.object
};

AddressBox.defaultProps = {
  hiddenBtnChange: false,
  hiddenSaveAddress: false,
  name: '',
  newAddress: false,
  onChange: () => {},
  onClick: () => {},
  onRemove: () => {},
  onSaveAddress: () => {},
  phone: '',
  selected: '',
  showRemove: false,
  typeAddress: '',
  user: undefined
};

export default connect(state => ({ user: state.user.user }))(AddressBox);
