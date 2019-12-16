import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from '../../../routes';

import { navMobileActs } from '../../../redux/actions';
import NavFooter from './NavFooter';
import ListCategories from './ListCategories';
import infoSource from '../../../utils/infoSource';


class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);

    this.onNavMobile = bindActionCreators(navMobileActs, props.dispatch);
    this.onCloseNav = this.onNavMobile.hidden.bind(this);
    this.onClickNav = this.onClickNav.bind(this);
  }

  onClickNav({ target }) {
    if (target && target.className.indexOf('nav_mobile') !== -1) {
      this.onCloseNav();
    }
  }


  render() {
    const { items, show, pathname } = this.props;


    return (
      <header
        className={`nav_mobile_ui${show ? '-show' : ''}`}
        onClick={this.onClickNav}
      >
        <nav className="nav_left">
          <div className="logo" onClick={this.onCloseNav}>
            <Link route="/">
              <a>
                <img src="../../../static/images/company/icon_logotipo_neutro.png" alt={infoSource.companyName} />
              </a>
            </Link>
          </div>

          <ListCategories
            onCloseNav={this.onCloseNav}
            items={items}
          />

          <NavFooter onCloseNav={this.onCloseNav} pathname={pathname} />
        </nav>
      </header>
    );
  }
}


export default connect(state => ({ show: state.navMobile.show }))(NavbarMobile);
