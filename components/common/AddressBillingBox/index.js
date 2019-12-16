import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { userActs } from '../../../redux/actions';
import { api } from '../../../serverServices';

class AddressBillingBox extends Component {
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
    const { address, user, newBillAddress, selected, onChange } = this.props;
    const userProfile = _.get(user, 'profile', '');

    if (userProfile !== '' && !loading) {
      this.setState({ loading: true });

      if (!userProfile.otherPaymentInfo) userProfile.otherPaymentInfo = [];

      if (userProfile.otherPaymentInfo.length === 0 || newBillAddress) {
        userProfile.otherPaymentInfo.push(address);

        onChange('newBillAddress', 'false');
        onChange('selectedBillAddress', userProfile.otherPaymentInfo.length - 1);
      } else {
        userProfile.otherPaymentInfo[selected] = address;
      }

      api.users.updateById({ ...user, profile: userProfile }, () => {
        this.setState({ loading: false });

        this.onUser.getUser();
      });
    }
  }

  render() {
    const { loading } = this.state;
    const {
      hiddenBtnChange, hiddenSaveAddress, address, user, showRemove
    } = this.props;

    return (
      <div className="address_box">
        <div className="address">
          <div className="info-box">
            <p>
              <strong>Nombre o razón social:</strong> {_.get(address, 'name', '')}<br />
              <strong>CIF:</strong> {_.get(address, 'cif', '')}
            </p>
            <p>
              <strong>Dirección:</strong> {_.get(address, 'address', '')}<br />
              <strong>Ciudad:</strong> {_.get(address, 'city', '')}<br />
              <strong>Provincia:</strong> {_.get(address, 'state', '')}<br />
              <strong>Código postal:</strong> {_.get(address, 'codePostal', '')}<br />
              <strong>País:</strong> {_.get(address, 'country', '')}
            </p>
            <p>
              <strong>Teléfono:</strong> {_.get(address, 'phone', '')}
            </p>
          </div>

          <div className="last_btns">
            {
              hiddenBtnChange ? null
              : <button
                type="button"
                className="btn_address"
                onClick={this.onClick}
              >Cambiar Dirección
              </button>
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
      </div>
    );
  }
}

AddressBillingBox.propsTypes = {
  address: PropTypes.object.isRequired,
  hiddenBtnChange: PropTypes.bool,
  name: PropTypes.string,
  newBillAddress: PropTypes.bool,
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

AddressBillingBox.defaultProps = {
  hiddenBtnChange: false,
  hiddenSaveAddress: false,
  name: '',
  newBillAddress: false,
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

export default connect(state => ({ user: state.user.user }))(AddressBillingBox);
