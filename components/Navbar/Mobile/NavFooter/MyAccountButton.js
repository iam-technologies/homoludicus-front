import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import React, { Component } from 'react';

import { showLoginActs } from '../../../../redux/actions';


class MyAccountButton extends Component {
  constructor(props) {
    super(props);

    this.showLogin = bindActionCreators(showLoginActs, props.dispatch);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { isLogin, onCloseNav, pathname } = this.props;

    if (!isLogin) {
      e.preventDefault();

      const redirect = pathname !== '/checkout' && pathname !== '/my-account';
      this.showLogin.show(redirect);
    }

    onCloseNav();
  }

  render() {
    const { isLogin } = this.props;

    return (
      <Link
        onClick={this.onClick}
        href="/my-account"
      >
        <a className="nav_footer-btns nav_footer-btn_right">
          {isLogin ? 'Mi cuenta' : 'Iniciar sesión'}
        </a>
      </Link>
    );
  }
}

export default connect(state => ({ isLogin: state.isLogin.login }))(MyAccountButton);
