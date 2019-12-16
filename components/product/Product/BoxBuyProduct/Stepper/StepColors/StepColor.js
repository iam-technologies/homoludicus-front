import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { configAttrActs, showImgAttributeActs } from '../../../../../../redux/actions';
import { dataFormat } from '../../../../../../utils';
import { imgServices } from '../../../../../../serverServices';


class StepColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentWidth: 400
    };

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.resizeHandler = null;

    this.onAttrChange = bindActionCreators(configAttrActs, props.dispatch);
    this.onShowImg = bindActionCreators(showImgAttributeActs, props.dispatch);
  }

  componentDidMount() {
    this.resizeHandler = window.addEventListener('resize', this.refreshParentWidth);
    this.refreshParentWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refreshParentWidth);
  }

  refreshParentWidth = () => {
    const parent = document.getElementsByClassName('stepper-main');
    const parentWidth = parent.length > 0 ? parent[0].clientWidth : 400;

    this.setState({ parentWidth });
  }

  onClick() {
    const { itemParent, item, price, pathKey, config, generalConfig } = this.props;
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

  onMouseEnter() {
    const { item } = this.props;

    const img = _.get(item, 'properties.img', '');

    if (img) {
      this.onShowImg.show(img);
    }
  }

  onMouseLeave() {
    const { item } = this.props;

    if (_.get(item, 'properties.img', '')) {
      this.onShowImg.remove();
    }
  }


  render() {
    const { item, config, price } = this.props;
    const { parentWidth } = this.state;
    const circleSize = (parentWidth / 5) + 1.8;

    const isAvailable = _.get(item, 'properties.availability', false);
    if (!isAvailable) return null;

    const colorValue = _.get(item, 'properties.colorValue', '');
    const img = _.get(item, 'properties.imgMini', '');
    const key = _.get(config, 'key', '');
    const colorName = _.get(item, 'name.es', '');
    const colorBottom = price === 0 ? colorName : `${colorName} +${dataFormat.formatCurrency(price)}`;

    const className = `type_color ${key === item.key ? 'checked' : ''}`;
    const style = {
      backgroundColor: colorValue,
      backgroundImage: `url(${img ? imgServices.getUrl(img, 'mobile') : ''})`,
      width: `${circleSize}px`,
      height:`${circleSize}px`
    };


    return (
      <div className={className}>
        <div
          className="type_color-circle"
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          style={style}
        >
          {/* { !colorValue && !img ? <p><span>{colorName}</span></p> : '' } */}
        </div>

        <p className="type_color-text">{ colorBottom }</p>
      </div>
    );
  }
}


StepColor.propTypes = {
  config: PropTypes.object,
  item: PropTypes.object.isRequired,
  itemParent: PropTypes.object.isRequired,
  pathKey: PropTypes.string.isRequired,
  price: PropTypes.number
};

StepColor.defaultProps = {
  config: {},
  price: 0
};


export default connect()(StepColor);
