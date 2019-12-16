import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import { api } from '../../../serverServices';
import { userActs } from '../../../redux/actions';


class Logout extends Component {
  constructor(props) {
    super(props);

    this.onUser = bindActionCreators(userActs, props.dispatch);

    this.logout = this.logout.bind(this);
  }

  // Logout function
  logout() {
    api.account.logout((error, res) => {
      if (res) {
        this.onUser.removeUser();
      }
    });
  }

  render() {
    const { className } = this.props;

    return (
      <button
        className={className}
        onClick={this.logout}
        type="button"
      >Cerrar sesión
      </button>
    );
  }
}


export default connect()(Logout);
