import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Alert from 'react-s-alert';
import React, { Component } from 'react';
import { Link } from '../../../routes';

import { showLoginActs, isLoginActs, userActs } from '../../../redux/actions';
import { msgUI, checkFields } from '../../../utils';
import { api } from '../../../serverServices';
import { TextInput, ButtonInput } from '../../common';
import infoSource from '../../../utils/infoSource';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: [],
      loading: false,
      password: ''
    };

    this.showLogin = bindActionCreators(showLoginActs, props.dispatch);
    this.onIsLogin = bindActionCreators(isLoginActs, props.dispatch);
    this.onUser = bindActionCreators(userActs, props.dispatch);
    this.onClose = this.showLogin.hidden.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
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

  render() {
    const { email, password, errors, loading } = this.state;
    const { show, isLogin } = this.props;

    if (isLogin) return null;

    return (
      <div className={`login_app${show ? '-show' : ''}`}>
        <header className="header_login">
          <Link route="/">
            <a onClick={this.onClose} className="header_login-logo">
              <img src="../../../static/images/company/icon_logotipo_neutro.png" alt={infoSource.compNameCap} />
            </a>
          </Link>

          <button
            className="header_login-right_btn-close"
            onClick={this.onClose}
            type="button"
          >
            <img src="../../../static/images/icon_close.png" alt="Cross" />
          </button>
        </header>

        <div className="login-form">
          <p className="title">Ya soy usuario</p>

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
            <Link route="/forgot-password">
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

          <div className="signup">
            <p className="title">Nuevo cliente</p>
            <p className="text">Puedes continuar con tu compra. Una vez finalizado el pedido, podrás registrarte y guardar tus datos para próximas ocasiones.</p>

            <div className="btn_login">
              <ButtonInput
                className="btns_width"
                label="CONTINUAR"
                onClick={this.onClose}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(state => ({
  isLogin: state.isLogin.login,
  show: state.showLogin.show
}))(Login);
