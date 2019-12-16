import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { showCartPopupActs } from '../../../redux/actions';


class CartNavBtn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onShowPopup = bindActionCreators(showCartPopupActs, props.dispatch);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onCloseNav } = this.props;

    this.onShowPopup.show();

    onCloseNav();
  }


  render() {
    const { className, item, text, iconGrey } = this.props;

    return (
      <div
        className={`cart_nav_ui ${className}`}
      >
        <button
          className="cart_nav-btn"
          onClick={this.onClick}
          type="button"
        >
          <img src={`../../static/images/icon_cart${iconGrey ? '_grey' : ''}.png`} alt="Shopping cart" />
          {
            text && <span>{text}</span>
          }

          <div className={`cart_nav-badge ${item === 0 ? 'hidden' : ''}`}>
            <p>{item}</p>
          </div>
        </button>
      </div>
    );
  }
}

CartNavBtn.propTypes = {
  className: PropTypes.string,
  item: PropTypes.number.isRequired,
  text: PropTypes.string,
  onCloseNav: PropTypes.func,
  iconGrey: PropTypes.bool
};

CartNavBtn.defaultProps = { className: '', text: '', onCloseNav: () => {}, iconGrey: false };

export default connect(state => ({ item: _.get(state.carts.item, 'products', []).length }))(CartNavBtn);
