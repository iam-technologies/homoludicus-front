import React, { Component } from 'react';
import { Link } from '../../../routes';

import { api } from '../../../serverServices';
import { MobileHeader } from '../../common';
import ItemOrderList from './ItemOrderList';


export default class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      loading: true
    };

    this.onClickBill = this.onClickBill.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  onClickBill(e, link) {
    e.preventDefault();
    e.stopPropagation();

    window.open(link, '_blank');
  }

  getData() {
    const { loading } = this.state;

    if (!loading) return;
    this.setState({ loading: false });

    api.orders.getAll((error, res) => {
      if (res) {
        this.setState({ orders: res.data });
      }
    });
  }


  render() {
    const { orders } = this.state;

    return (
      <section className="app-my_account my_orders">
        <MobileHeader
          green
          logo
        />

        <p className="title">Mis Pedidos</p>

        <div className="app-my_account-container list_orders">
          <div className="th-header">
            <p className="cell">Nº Pedido</p>
            <p className="cell">Fecha</p>
            <p className="cell">Importe</p>
            <p className="cell cell_status">Estado</p>
            <p className="cell">Factura</p>
          </div>

          <div className="th-body">
            {
              orders.map(elem => <ItemOrderList key={elem._id} item={elem} onClickBill={this.onClickBill} />)
            }
          </div>
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
