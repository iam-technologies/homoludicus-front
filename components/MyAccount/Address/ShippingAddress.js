import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { api } from '../../../serverServices';
import { msgUI } from '../../../utils';
import { userActs } from '../../../redux/actions';
import { AddressBox } from '../../common';
import FormAddress from './FormAddress';


class ShippingAddress extends Component {
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

    user.profile.address.splice(index, 1);

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

    const items = _.get(user, 'profile.address', []);
    const profile = _.get(user, 'profile', {});

    return items.map((elem, i) => (
      <AddressBox
        hiddenSaveAddress
        showRemove
        onClick={() => this.onAddAddress(i)}
        onRemove={() => this.onRemove(i)}
        address={elem}
        key={user._id + i.toString()}
        name={`${_.get(elem, 'name', '')} ${_.get(elem, 'lastname', '')}`}
        phone={_.get(profile, 'phone', '')}
      />
    ));
  }


  render() {
    const { addressEdit, showForm } = this.state;
    const { user } = this.props;

    let textTitle = 'Mis Direcciones de envío';
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
            <FormAddress
              index={addressEdit}
              user={user}
              onUser={this.onUser}
              onChange={this.onChange}
              address={_.get(user, `profile.address.${addressEdit}`, {})}
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


ShippingAddress.propTypes = { user: PropTypes.object };

ShippingAddress.defaultProps = { user: {} };

export default connect(state => ({ user: state.user.user }))(ShippingAddress);
