import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import BoxCanarias from './BoxCanarias';
import BoxPeninsula from './BoxPeninsula';


export default class SelectShipping extends Component {
  constructor(props) {
    super(props);

    this.getBox = this.getBox.bind(this);
  }


  getBox() {
    const { item, onChange } = this.props;
    const country = _.get(item, 'sendOrder.country', '');
    const state = _.get(item, 'sendOrder.state', '');

    if (country === 'España' && /Ceuta|Melilla|Santa Cruz de Tenerife|Las Palmas/.test(state)) {
      return <BoxCanarias item={item} onChange={onChange} />;
    }

    return (
      <BoxPeninsula
        item={item}
        onChange={onChange}
        state={state}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <p className="title">Método de envío</p>

        <div className="select_shipping">
          {
            this.getBox()
          }
        </div>
      </Fragment>
    );
  }
}

SelectShipping.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
