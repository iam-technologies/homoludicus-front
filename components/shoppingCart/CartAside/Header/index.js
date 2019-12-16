import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { showCartPopupActs } from '../../../../redux/actions';
import { Badge } from '../../../common';


class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.onShowCartPopup = bindActionCreators(showCartPopupActs, props.dispatch);
    this.onClosePopup = this.onShowCartPopup.hidden.bind(this);
  }


  render() {
    const { isPopup, numItems } = this.props;

    return (
      <header className="app_cart_aside-header">
        <p className="title">Carrito</p>

        {
          isPopup
            ? (
              <button
                className ="btn_close"
                onClick ={this.onClosePopup}
                type ="button"
              >Cerrar
              </button>
            ) : (
              <Badge>{numItems}</Badge>
            )
        }
      </header>
    );
  }
}


Header.propTypes = {
  isPopup: PropTypes.bool.isRequired,
  numItems: PropTypes.number.isRequired
};


export default connect()(Header)
;