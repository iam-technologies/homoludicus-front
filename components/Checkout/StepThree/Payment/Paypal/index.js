import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { cartsActs } from '../../../../../redux/actions';
import { api } from '../../../../../serverServices';
import { msgUI } from '../../../../../utils';
import { validateStep } from '../../../helpers';
import PaypalBtn from './PaypalBtn';


class Paypal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showButton: false,
      clickButton: false,
      item: ''
    };

    this.onCart = bindActionCreators(cartsActs, props.dispatch);
    this.onChange = props.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getClick = this.getClick.bind(this);
    this.shouldShowButton = this.shouldShowButton.bind(this);
  }

  componentDidMount() {
    this.shouldShowButton();
  }

  componentDidUpdate() {
    this.shouldShowButton();
  }

  componentWillUnmount() {
    const { item, clickButton } = this.state;
    const { onChange } = this.props;

    if (item !== '') {
      if (!clickButton) {
        api.orders.upsert({ item, cancel: true }, _.get(item, '_id', ''), () => {});
      }

      item._id = '';
      delete item.paymentMethod;
      delete item.status;

      onChange('', { item }, 'updateProduct');
    }
  }

  onSubmit(item) {
    const { item: oldItem } = this.state;
    const { onChange } = this.props;
    const newItem = { ...oldItem, ...item };

    api.orders.upsert({ item: newItem }, '', (err, res) => {
      if (res) {
        this.setState({ showButton: true, item: res.data, loading: false });
      } else if (err) {
        let msg = msgUI.getText(`order_validation.${err.type}`);

        if (msg === '') { msg = msgUI.getText('order_validation.invalid-order'); }

        if (err.data && err.data.length > 0) {
          const msgDiscount = err.data.filter(e => e.name === 'discount');

          if (msgDiscount.length > 0) {
            msg = msgUI.get(msgDiscount, 'discount');

            this.onCart.removeDiscount();
          }
        }

        Alert.warning(msg);

        delete newItem.paymentMethod;
        onChange('', { item: newItem }, true);
      }
    });
  }

  static getDerivedStateFromProps() {
    return { loading: true };
  }

  getClick() {
    this.setState({ clickButton: true });
  }

  validate() {
    const { loading } = this.state;

    if (loading) {
      const { item, onChange } = this.props;

      validateStep({ ...item }, 2, (error, res) => {
        if (res) {
          this.onSubmit(res);

          return;
        }

        this.setState({ showButton: false, item: '', loading: false });

        onChange('', { errors: error }, true);
      });
    }
  }

  shouldShowButton() {
    if (this.props.item && this.props.item.acceptTerms) {
      if (!this.state.showButton) this.validate();
    } else {
      if (this.state.showButton) this.setState({showButton: false});
    }
  }


  render() {
    const { item, showButton } = this.state;
    console.log('TCL: render -> item', item);
    const { onSubmitOrder, onChange } = this.props;

    if (item !== '' && showButton) {
      return (
        <div onClick={this.validate}>
          <PaypalBtn
            item={item}
            onSubmitOrder={onSubmitOrder}
            onChange={onChange}
            getClick={this.getClick}
          />
        </div>
      );
    } else {
      return <span className="paypal-terms-message">Debes aceptar los términos de servicio y la política de privacidad</span>
    }
  }
}


Paypal.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitOrder: PropTypes.func.isRequired
};

export default connect()(Paypal);
