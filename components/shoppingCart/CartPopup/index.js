import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { showCartPopupActs } from '../../../redux/actions';
import CartAside from '../CartAside';


class CartPopup extends Component {
  constructor(props) {
    super(props);

    this.onShowCartPopup = bindActionCreators(showCartPopupActs, props.dispatch);
    this.onClosePopup = this.onShowCartPopup.hidden.bind(this);
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
