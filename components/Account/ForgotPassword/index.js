import React, { Component } from 'react';

import { api } from '../../../serverServices';
import { msgUI, checkFields } from '../../../utils';
import { ButtonInput, TextInput } from '../../common';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      errors: [],
      success: false
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(path, value) {
    this.setState({ [path]: value });
  }

  onKeyPress(e) {
    const { charCode } = e;

    if (charCode === 13) this.onClick();
  }

  onClick() {
    const { email, loading } = this.state;

    if (loading) return;
    this.setState({ loading: true, errors: [] });

    const errors = [...checkFields.isValidEmail(email, 'email')];
    if (errors.length > 0) {
      this.setState({ errors, loading: false });
      return;
    }

    api.account.forgotPassword(email, (error, res) => {
      if (error) {
        this.setState({ loading: false, errors: [{ path: 'email', type: 'not-found', name: 'email' }] });
        return;
      }

      if (res) {
        this.setState({ success: true });
      }
    });
  }


  render() {
    const { loading, email, errors, success } = this.state;

    return (
      <div className="forgot_password">
        <p className="title">Recuperar contraseña</p>

        {
          !success ? (
            <div className="app_account-form">
              <TextInput
                maxWidth
                error={msgUI.get(errors, 'email')}
                hintLabel="Email"
                label="Email"
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                path="email"
                value={email}
              />

              <div className="btn_submit">
                <ButtonInput
                  label={loading ? 'ENVIANDO...' : 'ENVIAR'}
                  onClick={this.onClick}
                />
              </div>
            </div>
          ) : (
            <p className="account_success">Se ha enviado un correo al email introducido con las instrucciones para cambiar la contraseña.</p>
          )
        }
      </div>
    );
  }
}
