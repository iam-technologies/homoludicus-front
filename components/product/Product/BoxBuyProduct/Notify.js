import React, { Component } from 'react';
import Alert from 'react-s-alert';

import { api } from '../../../../serverServices';
import { ButtonInput, TextInput } from '../../../common';
import { msgUI, checkFields } from '../../../../utils';

class Notify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: [],
      showInputEmail: false
    };

    this.showInputEmail = this.showInputEmail.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(path, value) {
    this.setState({ email: value, errors: [] });
  }

  onClick() {
    const { email } = this.state;

    const errors = [...checkFields.isValidEmail(email, 'email')];
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    const { notifyAvailability, id } = this.props;
    if (notifyAvailability.indexOf(email) === -1) {
      notifyAvailability.push(email);
    } else {
      this.setState({ errors: [{ name: 'email', path: 'email', type: 'already-send' }]});
      return;
    }

    api.products.updateById(id, { notifyAvailability }, (error, res) => {
      if (res) {
        Alert.info('Email guardado');
        this.setState({ showInputEmail: false });
      }
    });
  }

  showInputEmail() {
    this.setState({ showInputEmail: true })
  }

  render() {
    const { email, errors, showInputEmail } = this.state;

    return (
      <div className="a_p-buy_p-notify">
        <p className="a_p-buy_p-notify-not_available">
          {
            showInputEmail
              ? 'Avisar cuando esté disponible'
              : 'No disponible'
          }
        </p>

        {
          showInputEmail
            ? (
              <div className={errors ? 'a_p-buy_p-notify-email p-email-errors' : 'a_p-buy_p-notify-email'}>
                <TextInput
                  error={msgUI.get(errors, 'email')}
                  hintLabel="Email"
                  onChange={this.onChange}
                  path="email"
                  type="email"
                  value={email}
                  required
                  maxWidth
                />
                <ButtonInput
                  onClick={this.onClick}
                  label="ENVIAR"
                />
              </div>
            )
            : (
              <ButtonInput
                label="AVISAR CUANDO ESTÉ DISPONIBLE"
                onClick={this.showInputEmail}
              />
            )
        }
      </div>
    );
  }
}

export default Notify;
