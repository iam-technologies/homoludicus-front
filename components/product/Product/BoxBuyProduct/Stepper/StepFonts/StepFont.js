import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { configAttrActs } from '../../../../../../redux/actions';
import { Image } from '../../../../../common';


class StepFont extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onAttrChange = bindActionCreators(configAttrActs, props.dispatch);
  }


  onClick() {
    const { itemParent, pathKey, item, price, config, generalConfig } = this.props;

    if (config.key && config.key === item.key) {
      this.onAttrChange.remove(generalConfig, pathKey);
    } else {
      this.onAttrChange.add({
        [pathKey]: {
          price,
          item: itemParent,
          key: item.key,
          value: item
        }
      });
    }
  }

  render() {
    const { item, config } = this.props;

    const isAvailable = _.get(item, 'properties.availability', false);
    if (!isAvailable) return null;

    const className = `type_font ${_.get(config, 'key', '') === item.key ? 'checked' : ''}`;

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <Image
          alt={_.get(item, 'name.es', 'font')}
          className="imagen"
          src={_.get(item, 'properties.img', '')}
        />
      </div>
    );
  }
}


StepFont.propTypes = {
  config: PropTypes.object,
  item: PropTypes.object.isRequired,
  itemParent: PropTypes.object.isRequired,
  pathKey: PropTypes.string.isRequired,
  price: PropTypes.number
};

StepFont.defaultProps = {
  config: {},
  price: 0
};


export default connect()(StepFont);
