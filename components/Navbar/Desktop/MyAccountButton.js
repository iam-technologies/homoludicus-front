import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';

import { showLoginActs } from '../../../redux/actions';
import account from '../../../serverServices/api/account';


class MyAccountButton extends Component {
  constructor(props) {
    super(props);

    this.showLogin = bindActionCreators(showLoginActs, props.dispatch);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    const { isLogin } = this.props;

    if (isLogin) Router.push('/my-account');
    else this.showLogin.show(true);
  }

  render() {
    const { isLogin } = this.props;

    return (
      <div onClick={this.onClick}>
        <img src={`../../../static/images/icon_my-account${isLogin ? '_login' : ''}.png`} alt="User's My account" />
      </div>
    );
    // return (
    //   <Link
    //     onClick={isLogin ? () => {} : this.onClick}
    //     href="/my-account"
    //   >
    //     <img src={`../../../static/images/icon_my-account${isLogin ? '_login' : ''}.png`} alt="User's My account" />
    //   </Link>
    // );
  }
}

export default connect(state => ({ isLogin: state.isLogin.login }))(MyAccountButton);
