import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from '../../routes';

import { MobileHeader } from '../common';
import { showLoginActs } from '../../redux/actions';


class MyAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.showLogin = bindActionCreators(showLoginActs, props.dispatch);
  }

  componentDidMount() {
    this.showLogin.show(false);
  }

  render() {
    return (
      <section className="app-my_account">
        <MobileHeader
          green
          logo
        />

        <p className="title">Mi cuenta</p>

        <div className="my_account-section">
          <Link route="/orders">
            <a className="my_account-link">
              <span className="icon icon_orders" />
              <p>Mis Pedidos</p>
            </a>
          </Link>

          <Link route="/favourites">
            <a className="my_account-link">
              <span className="icon icon_favorites" />
              <p>Mis Favoritos</p>
            </a>
          </Link>

          <Link route="/addresses">
            <a className="my_account-link">
              <span className="icon icon_address" />
              <p>Mis Direcciones</p>
            </a>
          </Link>

          <Link route="/profile">
            <a className="my_account-link">
              <span className="icon icon_profile" />
              <p>Mis Datos</p>
            </a>
          </Link>
        </div>
      </section>
    );
  }
}

export default connect()(MyAccount);
