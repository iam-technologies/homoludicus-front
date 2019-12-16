import Alert from 'react-s-alert';
import React, { Component } from 'react';
import { Link } from '../../../routes';

import { api } from '../../../serverServices';
import { MobileHeader } from '../../common';
import Favourite from './Favourite';


export default class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true
    };

    this.getData = this.getData.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onRemove(e, id) {
    e.preventDefault();
    e.stopPropagation();

    api.favourites.remove(id, (error, res) => {
      if (res) {
        this.getData();

        Alert.info('El producto ha sido eliminado de tus favoritos');
        return;
      }

      Alert.warning('No ha sido posible eleminar el producto de tus favoritos');
    });
  }

  getData() {
    api.favourites.getAll((error, res) => {
      let items = [];

      if (res) {
        items = res.data;
      }

      this.setState({ loading: false, items });
    });
  }


  render() {
    const { items, loading } = this.state;

    if (loading) return null;

    return (
      <section className="app-my_account my_favourites">
        <MobileHeader
          green
          logo
        />

        <p className="title">Mis Favoritos</p>

        <div className="app-my_account-container list_favourites">
          {
            items.length > 0
              ? items.map(elem => <Favourite key={elem._id} item={elem} onRemove={this.onRemove} />)
              : <p className="not-items">Aún no tienes productos favoritos</p>
          }
        </div>

        <div className="app-my_account-container link_container">
          <Link route="/my-account">
            <a className="link_return">
              <img src="../../../static/images/icon_back_checkout.png" alt="Volver a mi cuenta" />
              <span>Volver a mi cuenta</span>
            </a>
          </Link>
        </div>
      </section>
    );
  }
}
