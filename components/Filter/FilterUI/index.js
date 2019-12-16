import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { withWindowResize } from '../../hoc';
import PriceRange from './PriceRange';
import WrapperFilters from './WrapperFilters';


class FilterUI extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      styleHeight: 0
    };

    this.refAllFilter = React.createRef();

    this.onChange = props.onChange.bind(this);
    this.showFilters = this.showFilters.bind(this);
  }

  showFilters() {
    let { show, styleHeight } = this.state;
    const refAllFilter = this.refAllFilter.current;

    if (styleHeight !== 0) {
      styleHeight = 0;
    } else {
      styleHeight = refAllFilter.scrollHeight;
    }

    show = !show;

    this.setState({ show, styleHeight });
  }


  render() {
    const { category, filters, priceRange, screen } = this.props;

    const { show, styleHeight } = this.state;

    const minPrice = _.get(category, 'minPrice', null);
    const maxPrice = _.get(category, 'maxPrice', null);
    const ctgFilters = _.get(category, 'filters', []).length;

    if (!minPrice && !maxPrice && ctgFilters <= 0) return null;


    return (
      <section className="filter_ui">
        <div className="container">
          <div className="filter_ui-top">
            <PriceRange
              initPrice={[minPrice, maxPrice]}
              priceRange={priceRange}
              onChange={this.onChange}
            />

            {
              ctgFilters > 0 && screen !== 'xs' ? (
                <button
                  className="filter_ui-btn_show_filters"
                  onClick={this.showFilters}
                  type="button"
                >
                  <p className="filter_ui-title">{`Ver ${show ? 'menos' : 'más'} filtros`}</p>
                  <div className="filter_ui-btn_show_filters-img" />
                </button>
              ) : null
            }
          </div>

          {
            ctgFilters > 0 && screen !== 'xs' ? (
              <div
                className="filter_ui-all"
                ref={this.refAllFilter}
                style={{ maxHeight: `${styleHeight}px` }}
              >
                <WrapperFilters
                  filters={_.get(filters, 'attributes', {})}
                  attributes={category.filters}
                  onChange={this.onChange}
                />
              </div>
            ) : null
          }
        </div>
      </section>
    );
  }
}

FilterUI.propTypes = {
  category: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  priceRange: PropTypes.array
};

FilterUI.defaultProps = { priceRange: [] };

export default withWindowResize(FilterUI);
