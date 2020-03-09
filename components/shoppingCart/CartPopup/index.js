import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { showCartPopupActs, cartsActs } from '../../../redux/actions';
import CartAside from '../CartAside';


class CartPopup extends Component {
  constructor(props) {
    super(props);

    this.onShowCartPopup = bindActionCreators(showCartPopupActs, props.dispatch);
    this.onCart = bindActionCreators(cartsActs, props.dispatch);
    this.onClosePopup = this.onShowCartPopup.hidden.bind(this);
  }

  componentDidMount() {
    this.onCart.getCart();
  }

  render() {
    const { show } = this.props;

    return (
      <section
        className={`app_cart_popup${show ? '-show' : ''}`}
      >
        <div className="hidden_left" onClick={this.onClosePopup} />
        <CartAside
          isPopup
          className={`cart_popup-aside${show ? '_show' : ''}`}
        />
      </section>
    );
  }
}


export default connect(state => ({ show: state.showCartPopup.value }))(CartPopup);
