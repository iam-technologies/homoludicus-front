import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Router from 'next/router';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import Link from '../../../routes';

import { showLoginActs, isLoginActs, userActs } from '../../../redux/actions';
import { msgUI, checkFields } from '../../../utils';
import { api } from '../../../serverServices';
import { TextInput, ButtonInput } from '../../common';


class LoginTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: [],
      loading: true,
      password: '',
      redirect: false,
      path: ''
    };

    this.showLogin = bindActionCreators(showLoginActs, props.dispatch);
    this.onIsLogin = bindActionCreators(isLoginActs, props.dispatch);
    this.onUser = bindActionCreators(userActs, props.dispatch);
    this.onClose = this.showLogin.hidden.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.getRedirect = this.getRedirect.bind(this);
  }

  componentDidMount() {
    console.log('this.props = ', this.props);
    const { login } = this.props;

    if (login) this.getRedirect();

    this.setState({ loading: false });
  }

  onKeyPress(e) {
    const { charCode } = e;

    if (charCode === 13) this.onClick();
  }

  onClick() {
    const { email, password, loading } = this.state;

    if (loading) return;
    this.setState({ loading: true, errors: [] });

    const errors = [
      ...checkFields.isValidEmail(email, 'email'),
      ...checkFields.isValidPassword(password, 'password')
    ];
    if (errors.length > 0) {
      this.setState({ errors, loading: false });
      return;
    }

    api.account.login(email, password, (error, res) => {
      if (res) {
        this.onUser.getUser();
        this.onIsLogin.change(res);
        this.getRedirect();
        return;
      }

      Alert.warning(msgUI.getText('account.login_error'));
      this.setState({ loading: false });
    });
  }

  onChange(path, value) {
    let finalValue = value;

    if (path === 'email') {
      finalValue = value.toLowerCase();
    }
    this.setState({ [path]: finalValue });
  }

  getRedirect() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const path = params.get('/login-to');

    this.setState({ redirect: true, path });
  }


  render() {
    const { email, password, errors, loading, redirect, path } = this.state;

    if (redirect) {
      // return <Redirect to={path} />;
      return Router.push({ path });
    }

    return (
      <div className="login_app-to">
        <div className="login-form">

          <TextInput
            maxWidth
            error={msgUI.get(errors, 'email')}
            hintLabel="Email"
            label="Email"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            path="email"
            type="email"
            value={email}
          />

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

          <p className="link_forgot">
            <Link
              route="/forgot-password"
            >
              <a onClick={this.onClose}>Recuperar contraseña</a>
            </Link>
          </p>

          <div className="btn_login">
            <ButtonInput
              ghost
              className="btns_width"
              label={loading ? 'CARGANDO...' : 'ENTRAR'}
              onClick={this.onClick}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default connect(state => ({
  show: state.showLogin.show,
  login: state.isLogin.login
}))(LoginTo);
