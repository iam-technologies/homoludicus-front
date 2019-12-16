import { Range } from 'rc-slider';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import 'rc-slider/dist/rc-slider.min.css';


export default class PriceRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initRange: props.initPrice,
      priceRange: props.priceRange.length > 0 ? props.priceRange : props.initPrice
    };

    this.onFilterPrice = this.onFilterPrice.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) return true;

    return false;
  }

  onFilterPrice(priceRange) {
    this.setState({ priceRange });

    this.props.onChange('priceRange', priceRange);
  }

  render() {
    const { initRange, priceRange } = this.state;
    const min = initRange[0];
    const max = initRange[1];

    if (min === null || max === null || min === max) return null;


    return (
      <div className="filter_ui-price_range">
        <p className="filter_ui-title">Precio:</p>
        <p className="filter_ui-price_range-interval">{`${priceRange[0]}€`}</p>
        <Range
          allowCross
          className="filter_ui-price_range-slider"
          defaultValue={priceRange}
          max={max}
          min={min}
          onAfterChange={this.onFilterPrice}
          pushable={5}
        />
        <p className="filter_ui-price_range-interval">{`${priceRange[1]}€`}</p>
      </div>
    );
  }
}


PriceRange.propTypes = {
  initPrice: PropTypes.array.isRequired,
  priceRange: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

PriceRange.defaultProps = { priceRange: [] };
