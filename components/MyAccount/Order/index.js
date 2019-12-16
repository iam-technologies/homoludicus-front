import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import React, { Component } from 'react';
import { Link } from '../../../routes';

import { api } from '../../../serverServices';
import { urlUtils } from '../../../utils';
import { cartsActs } from '../../../redux/actions';
import { MobileHeader, RatingsForm, ButtonInput } from '../../common';
import HeaderOrder from './HeaderOrder';
import ProductOrder from './ProductOrder';
import StatusOrder from './StatusOrder';


class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      loading: true,
      editRating: {},
      sendToCheckout: false
    };

    this.onCart = bindActionCreators(cartsActs, props.dispatch);

    this.getData = this.getData.bind(this);
    this.getItem = this.getItem.bind(this);
    this.payOrder = this.payOrder.bind(this);

    this.onEditRating = this.onEditRating.bind(this);
    this.onSaveRating = this.onSaveRating.bind(this);
    this.onRepeatOrder = this.onRepeatOrder.bind(this);
    this.onPayOrder = this.onPayOrder.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  onEditRating(product) {
    this.setState({ editRating: product });
  }

  onSaveRating() {
    this.getItem();
  }

  onRepeatOrder() {
    const { item: { cart: { products } } } = this.state;

    this.onCart.addRepeatOrder(products);
  }

  onPayOrder() {
    this.setState({ sendToCheckout: true });
  }

  getData() {
    const { loading } = this.state;

    if (!loading) return;
    this.setState({ loading: false });

    this.getItem();
  }

  getItem() {
    const id = urlUtils.getParamsUrl('id', this.props);

    api.orders.getById(id, (error, res) => {
      if (res) {
        this.setState({ item: res.data });
      }
    });
  }

  payOrder(status) {
    // Let pay the order when it has budget and it is not paid
    let budgetSent = false;
    let noPayment = true;

    status.map((state) => {
      if (state.name === 'budgetSent') budgetSent = true;
      if (state.name.indexOf('Payment') !== -1) noPayment = false;
    });

    const payOrder = budgetSent && noPayment;
    return payOrder;
  }

  render() {
    const { item, editRating, loading, sendToCheckout } = this.state;
    const status = _.get(item, 'status', []);
    const payOrder = this.payOrder(status);

    if (sendToCheckout) {
      return (
        Router.push('/budget-checkout')
        // <Redirect
        //   href={{
        //     pathname: '/budget-checkout',
        //     state: { order: item }
        //   }}
        // />
      );
    }

    return (
      <section className="app-my_account my_order_item">
        <MobileHeader
          green
          logo
        />

        {
          !loading && (
            <RatingsForm
              onClose={() => this.onEditRating({})}
              onSave={this.onSaveRating}
              open={editRating._id !== undefined}
              orderId={_.get(item, '_id', '')}
              product={editRating}
            />
          )
        }

        <p className="title">Detalle del Pedido</p>

        <div className="my_order_item-container info_order">
          <HeaderOrder item={item} />

          {
            _.get(item, 'cart.products', []).map((elem, i) => (
              <ProductOrder
                config={_.get(elem, 'config', '')}
                indexOrder={i}
                key={item._id + i.toString()}
                onClick={this.onEditRating}
                product={_.get(elem, 'product', {})}
                ratingId={_.get(elem, 'ratingId', '')}
                status={_.get(item, 'status', '')}
              />
            ))
          }

          <StatusOrder item={item} />

          {
            payOrder && (
              <ButtonInput
                className="repeat_order"
                onClick={this.onPayOrder}
                label="Finalizar pedido"
              />
            )
          }

          {
            !payOrder && (
              <ButtonInput
                className="repeat_order"
                onClick={this.onRepeatOrder}
                label="Pedir de nuevo"
              />
            )
          }

        </div>

        <div className="my_order_item-container link_container">
          <Link route="/orders">
            <a className="link_return">
              <img src="../../../static/images/icon_back_checkout.png" alt="Volver a mi cuenta" />
              <span>Volver a Mis Pedidos</span>
            </a>
          </Link>
        </div>
      </section>
    );
  }
}


export default connect()(Order);
