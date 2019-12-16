import Alert from 'react-s-alert';
import React, { Component } from 'react';

import { api } from '../../../serverServices';
import { msgUI, checkFields } from '../../../utils';
import { ButtonInput, TextInput } from '../../common';


export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      password: '',
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
    const { match } = this.props;
    const { token } = match.params;
    const { password, loading } = this.state;

    if (loading) return;
    this.setState({ loading: true, errors: [] });

    const errors = [...checkFields.isValidPassword(password, 'password')];
    if (errors.length > 0) {
      this.setState({ errors, loading: false });
      return;
    }

    api.account.resetPassword(password, token, (error, res) => {
      if (error) {
        this.setState({ loading: false, errors: error.data });

        const err = msgUI.get(error.data, 'token');
        if (err) { Alert.warning(err); }

        return;
      }

      if (res) {
        this.setState({ success: true });
      }
    });
  }


  render() {
    const { loading, password, errors, success } = this.state;

    return (
      <div className="reset_password">
        <p className="title">Reiniciar contraseña</p>

        {
          !success ? (
            <div className="app_account-form">
              <TextInput
                maxWidth
                error={msgUI.get(errors, 'password')}
                hintLabel="Contraseña"
                label="Contraseña"
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                path="password"
                type="password"
                value={password}
              />

              <div className="btn_submit">
                <ButtonInput
                  label={loading ? 'ENVIANDO...' : 'ENVIAR'}
                  onClick={this.onClick}
                />
              </div>
            </div>
          ) : (
            <p className="account_success">Se ha actualizado su contraseña con éxito, ya puede iniciar sesión.</p>
          )
        }
      </div>
    );
  }
}
