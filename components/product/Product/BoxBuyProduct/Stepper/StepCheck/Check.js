import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { dataFormat } from '../../../../../../utils';


export default class Check extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { item, keyPath, price, onClick } = this.props;

    onClick(keyPath, { ...item, keyPath }, price);
  }

  render() {
    const { item, checked, price } = this.props;

    let label = _.get(item, 'label.es', '');
    if (!label) {
      label = _.get(item, 'name.es', '');
    }

    const title = `${_.get(item, 'refProduct.name.es', '')} ${price !== 0 ? `(+${dataFormat.formatCurrency(price, true)})` : ''}`;

    const className = `type_check ${checked ? 'checked' : ''}`;
    return (
      <div>
        <p
          className={className}
          onClick={this.onClick}
        >
          <span className="icon_check" />
          { title }
        </p>
      </div>
    );
  }
}


Check.propTypes = {
  checked: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  keyPath: PropTypes.string,
  onClick: PropTypes.func,
  price: PropTypes.number.isRequired
};

Check.defaultProps = {
  keyPath: '',
  onClick: () => {}
};
