import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import { Link } from '../../../routes';

import { userActs } from '../../../redux/actions';
import { api } from '../../../serverServices';
import { msgUI, checkFields } from '../../../utils';
import { TextInput, ButtonInput, MobileHeader } from '../../common';
import Logout from '../../Account/Logout';
import FormPassword from './FormPassword';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      loading: true,
      updating: false,
      user: {}
    };

    this.onUser = bindActionCreators(userActs, props.dispatch);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    const { user, updating } = this.state;

    if (!updating) {
      this.setState({ updating: true, errors: [] });

      const errors = [
        ...checkFields.isRequired(_.get(user, 'profile.name', ''), 'profile.name'),
        ...checkFields.isRequired(_.get(user, 'profile.lastname', ''), 'profile.lastname'),
        ...checkFields.isRequired(_.get(user, 'profile.phone', ''), 'profile.phone'),
        ...checkFields.isValidEmail(_.get(user, 'emails.0.address', ''), 'emails.0.address')
      ];

      if (errors.length > 0) {
        this.setState({ errors, updating: false });
        return;
      }

      api.users.updateById(user, (error, res) => {
        if (res.ok) {
          Alert.info(msgUI.getText('general.profileSuccess'));

          this.onUser.getUser();
        } else {
          Alert.error(msgUI.getText('general.profileError'));
        }

        this.setState({ updating: false });
      });
    }
  }


  onChange(path, value) {
    const { user } = this.state;

    _.set(user, path, value);

    this.setState({ user });
  }

  static getDerivedStateFromProps(props, state) {
    const { user } = props;

    if (user.loading !== state.loading) {
      return {
        user: user.user,
        loading: user.loading
      };
    }

    return null;
  }


  render() {
    const { user, updating, errors, loading } = this.state;

    return (
      <section className="app-my_account app-profile">
        <MobileHeader
          green
          logo
        />

        <header className="app-my_account-container my_account-header">
          <p className="title">Mis Datos</p>

          <p className="align_right">
            <Logout
              className="btn_link_green"
            />
          </p>
        </header>


        <div className="app-my_account-container form_profile">
          <TextInput
            error={msgUI.get(errors, 'profile.name')}
            hintLabel="Nombre"
            label="Nombre"
            onChange={this.onChange}
            path="profile.name"
            value={_.get(user, 'profile.name', '')}
          />

          <TextInput
            error={msgUI.get(errors, 'profile.lastname')}
            hintLabel="Apellidos"
            label="Apellidos"
            onChange={this.onChange}
            path="profile.lastname"
            value={_.get(user, 'profile.lastname', '')}
          />

          <TextInput
            error={msgUI.get(errors, 'emails.0.address')}
            hintLabel="Email"
            label="Email"
            onChange={this.onChange}
            path="emails.0.address"
            value={_.get(user, 'emails.0.address', '')}
          />

          <TextInput
            error={msgUI.get(errors, 'profile.phone')}
            hintLabel="Teléfono"
            label="Teléfono"
            onChange={this.onChange}
            path="profile.phone"
            value={_.get(user, 'profile.phone', '')}
          />


          <div className="btn_save">
            <ButtonInput
              label={updating ? 'GUARDANDO...' : 'CONFIRMAR'}
              onClick={this.onSubmit}
            />
          </div>
        </div>

        <FormPassword
          onUser={this.onUser}
          loading={loading}
        />

        <div className="app-my_account-container link_container">
          <Link route="/my-account">
            <a className="link_return">
              <img src="../../../static/images/icon_back_checkout.png" alt="Volver a mi cuenta" />
              <span>Volver a mi cuenta</span>
            </a>
          </Link>
        </div>
      </section>
    );
  }
}


export default connect(state => ({ user: state.user }))(Profile);
