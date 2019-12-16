import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { dataFormat, priceCalc } from '../../../../../../utils';
import { configAttrActs } from '../../../../../../redux/actions';
import WrapperStep from '../WrapperStep';


class StepInput extends Component {
  constructor(props) {
    super(props);

    this.onAddAttr = bindActionCreators(configAttrActs, props.dispatch);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { item, pathKey, allConfig } = this.props;
    const splitPath = pathKey.split('-');
    const key = e.target.value;
    const price = priceCalc.attribute({}, item);

    if (splitPath.length > 1) {
      const keys = Object.keys(allConfig).filter(el => el.indexOf('-') !== -1);

      const inputConfig = {};
      keys.forEach((el) => {
        const itemConfig = allConfig[el];

        if (itemConfig.item.keyPath.indexOf(splitPath[0]) !== -1) {
          inputConfig[el] = { ...itemConfig, key };
        }
      });

      this.onAddAttr.add(inputConfig);
      return;
    }

    this.onAddAttr.add({ [pathKey]: key !== '' ? { item, key, price } : {} });
  }

  render() {
    const { title, config, item } = this.props;

    const price = priceCalc.attribute({}, item);

    return (
      <WrapperStep
        title={title}
      >
        <div className="step-input">
          <input
            type="text"
            onChange={this.onChange}
            placeholder="Escribe aquí"
            value={_.get(config, 'key', '')}
          />

          {
            price !== 0 && _.get(item, 'refProduct', '') === '' ? (
              <p className="type_input-text">{ dataFormat.formatCurrency(price) }</p>
            ) : null
          }
        </div>
      </WrapperStep>
    );
  }
}


StepInput.propTypes = {
  config: PropTypes.object,
  item: PropTypes.object.isRequired,
  pathKey: PropTypes.string.isRequired,
  title: PropTypes.string
};

StepInput.defaultProps = {
  config: {},
  title: ''
};

export default connect()(StepInput);
