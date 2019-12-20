import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { api } from '../../../serverServices';
import { msgUI } from '../../../utils';
import { userActs } from '../../../redux/actions';
import { AddressBillingBox } from '../../common';
import FormBillingAddress from './FormBillingAddress';

class BillingAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressEdit: -1,
      showForm: false
    };

    this.onUser = bindActionCreators(userActs, props.dispatch);

    this.renderAddress = this.renderAddress.bind(this);
    this.onAddAddress = this.onAddAddress.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.onUser.getUser();
  }

  onAddAddress(index = -1) {
    this.setState({
      addressEdit: index,
      showForm: true
    });
  }

  onChange() {
    this.setState({ addressEdit: -1, showForm: false });
  }

  onRemove(index) {
    const { user } = this.props;

    user.profile.otherPaymentInfo.splice(index, 1);
    delete user.profile.paymentInfo;

    api.users.updateById(user, (error, res) => {
      if (res) {
        Alert.info(msgUI.getText('general.addressRemoveSuccess'));

        this.onUser.getUser();
        return;
      }

      Alert.error(msgUI.getText('general.addressRemoveError'));
    });
  }

  renderAddress() {
    const { user } = this.props;

    const paymentInfo = _.get(user, 'profile.paymentInfo', {});
    let otherPaymentInfo = _.get(user, 'profile.otherPaymentInfo', []);

    if (Object.keys(paymentInfo).length > 0) {
      // To change all the paymentInfo object into otherPaymentInfo objects array
      console.log('Change paymentInfo into otherPaymentInfo');
      otherPaymentInfo = [paymentInfo, ...otherPaymentInfo];

      const userProfile = _.get(user, 'profile', '');
      userProfile.otherPaymentInfo = otherPaymentInfo;

      delete userProfile.paymentInfo;

      api.users.updateById({ ...user, profile: userProfile }, () => {
        this.onUser.getUser();
      });
    }

    const items = otherPaymentInfo;

    return items.map((elem, i) => (
      <AddressBillingBox
        hiddenSaveAddress
        showRemove
        onClick={() => this.onAddAddress(i)}
        onRemove={() => this.onRemove(i)}
        address={elem}
        key={user._id + i.toString()}
      />
    ));
  }

  render() {
    const { addressEdit, showForm } = this.state;
    const { user } = this.props;

    let textTitle = 'Mis Direcciones de facturación';
    if (showForm) {
      textTitle = addressEdit === -1 ? 'Añadir nueva dirección' : 'Cambiar dirección';
    }

    return (
      <React.Fragment>

        <header className="app-my_account-container my_account-header">
          <p className="title">{textTitle}</p>
          {
            showForm ? null : (
              <p className="align_right">
                <button
                  type="button"
                  className="btn_link_green"
                  onClick={() => this.onAddAddress()}
                >Añadir nueva dirección
                </button>
              </p>
            )
          }
        </header>

        {
          showForm ? (
            <FormBillingAddress
              index={addressEdit}
              user={user}
              onUser={this.onUser}
              onChange={this.onChange}
              address={_.get(user, `profile.otherPaymentInfo.${addressEdit}`, {})}
            />
          ) : <div className="app-my_account-container list_address">{ this.renderAddress() }</div>
        }
        {
          showForm && (
            <div className="app-my_account-container link_container">
              <button className="link_return" onClick={this.onChange} type="button">
                <img src="/images/icon_back_checkout.png" alt="Volver a Mis Direcciones" />
                <span>Volver a Mis Direcciones</span>
              </button>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}


BillingAddress.propTypes = { user: PropTypes.object };

BillingAddress.defaultProps = { user: {} };

export default connect(state => ({ user: state.user.user }))(BillingAddress);
