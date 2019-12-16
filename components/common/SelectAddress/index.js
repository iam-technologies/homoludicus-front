import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { dataFormat } from '../../../utils';
// import SelectInput from '../SelectInput';
import SelectInputBis from '../SelectInputBis';


export default class SelectAddress extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }


  onChange(path, key) {
    const { items, onChange } = this.props;

    const value = _.get(items, key, {});
    const newAddress = key > items.length - 1;

    const { selectedAddress } = this.props;
    const addressType = selectedAddress === 'selectedAddress' ? 'newAddress' : 'newBillAddress';

    onChange('', { item: { [selectedAddress]: key, [path]: value, [addressType]: newAddress }, errors: [] }, 'updateProduct');
  }


  render() {
    const { className, items, label, path, value } = this.props;

    const newItems = items.map(elem => dataFormat.getTextAddress(elem));

    return (
      <SelectInputBis
        address
        className={className}
        items={[...newItems, 'Nueva dirección']}
        label={label}
        onChange={this.onChange}
        path={path}
        value={value}
      />
    );
  }
}


SelectInputBis.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired
};

SelectInputBis.defaultProps = {
  className: '',
  label: ''
};
