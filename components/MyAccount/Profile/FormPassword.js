import _ from 'lodash';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { api } from '../../../serverServices';
import { msgUI, checkFields } from '../../../utils';
import { TextInput, ButtonInput } from '../../common';


export default class FormPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      password: '',
      updating: false,
      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(path, value) {
    this.setState({ [path]: value });
  }

  onSubmit() {
    const { oldPassword, password, updating } = this.state;

    if (updating) return;
    this.setState({ updating: true, errors: [] });

    const errors = [
      ...checkFields.isSamePassword(password, oldPassword, 'password', 'oldPassword')
    ];

    if (errors.length > 0) {
      this.setState({ errors, updating: false });
      return;
    }

    api.users.changedPassword(oldPassword, password, (error, res) => {
      let serverErrors = [];
      if (res) {
        const { onUser } = this.props;
        Alert.info(msgUI.getText('general.passwordSuccess'));

        onUser.removeUser();
        return;
      }

      const err = _.get(error, 'data.error', '');

      if (err === 'Unauthorized') {
        Alert.error(msgUI.getText('general.passwordError'));
      } else {
        serverErrors = error.data;
      }

      this.setState({ updating: false, errors: serverErrors });
    });
  }


  render() {
    const { oldPassword, password, errors, updating } = this.state;
    const { loading } = this.props;


    return (
      <div className="app-my_account-container form_password">
        <TextInput
          error={msgUI.get(errors, 'oldPassword')}
          hintLabel="Contraseña anterior"
          label="Contraseña anterior"
          onChange={this.onChange}
          path="oldPassword"
          type="password"
          value={oldPassword}
        />

        <TextInput
          error={msgUI.get(errors, 'password')}
          hintLabel="Nueva contraseña"
          label="Nueva contraseña"
          onChange={this.onChange}
          path="password"
          type="password"
          value={password}
        />


        <div className="btn_save">
          <ButtonInput
            disabled={loading}
            label={updating ? 'GUARDANDO...' : 'CAMBIAR CONTRASEÑA'}
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}


FormPassword.propTypes = {
  onUser: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
