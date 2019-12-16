import PropTypes from 'prop-types';
import ReactRating from 'react-rating';
import React from 'react';


const Rating = ({ bigger, medium, className, readonly, initialRating, onChange }) => (
  <div
    className={`rating_ui${bigger ? '-bigger' : ''}${medium ? '-medium' : ''} ${readonly ? '' : 'rating_ui-edit'} ${className}`}
  >
    <ReactRating
      emptySymbol={<img src="../../../static/images/icon_star_empty.png" className="icon_star" alt="Star vacía" />}
      fractions={2}
      fullSymbol={<img src="../../../static/images/icon_star_full.png" className="icon_star" alt="Star completa" />}
      initialRating={initialRating}
      stop={5}
      onChange={onChange}
      readonly={readonly}
    />
  </div>
);

Rating.propTypes = {
  bigger: PropTypes.bool,
  className: PropTypes.string,
  initialRating: PropTypes.number,
  medium: PropTypes.bool,
  onChange: PropTypes.func,
  readonly: PropTypes.bool
};

Rating.defaultProps = {
  bigger: false,
  className: '',
  initialRating: 0,
  medium: false,
  onChange: undefined,
  readonly: false
};

export default Rating;
