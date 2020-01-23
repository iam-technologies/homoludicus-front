import React, { Component, Fragment } from 'react';

import { isClient } from '../../serverServices/utils';
import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import NavbarDesktop from './Desktop';
import NavbarMobile from './Mobile';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    };

    this.getNavItems = this.getNavItems.bind(this);
  }

  componentDidMount() {
    this.getNavItems();
  }

  getNavItems() {
    const queryParams = { query: { idFather: '0' } };

    api.categories.getAll(queryParams, (error, res) => {
      if (error) return;
      const items = res.data;

      this.setState({ items, loading: false });
    });
  }

  render() {
    const { items, loading } = this.state;
    const { /* location, */ screen, pathname } = this.props;
    let styles = {};

    const mainMenu = [{
      title: 'Qui som', url: '/about-us'
    },
    {
      title: 'Botiga online', url: '/shop'
    },
    {
      title: 'Activitats', url: '/activities'
    },
    {
      title: 'Serveis', url: '/services'
    },
    {
      title: 'Contacte', url: '/contact'
    }];

    if (screen === 'lg') {
      if (pathname === '/checkout') return null;
      if (pathname !== '/') styles = { height: '95px' };

      return (
        <header
          className={`app-header animation_opacity${!loading ? '-remove' : ''}`}
          style={styles}
        >
          <NavbarDesktop items={items} pathname={pathname} mainMenu={mainMenu} />
        </header>
      );
    }

    return (
      <>
        {isClient && (
          <NavbarMobile items={items} pathname={pathname} mainMenu={mainMenu} />
        )}
      </>
    );
  }
}

export default withWindowResize(Navbar);
