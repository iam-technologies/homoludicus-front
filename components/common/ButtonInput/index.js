import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ButtonInput extends Component {
  constructor(props) {
    super(props);

    this.onClick = props.onClick.bind(this);
  }

  render() {
    const { className, label, disabled, ghost, icon } = this.props;

    return (
      <button
        className={`button_${ghost ? 'ghost_' : ''}ui ${className}`}
        disabled={disabled}
        onClick={this.onClick}
        type="button"
      >
        { icon && <img src={icon} alt="icon" /> }
        { label }
      </button>
    );
  }
}


ButtonInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  ghost: PropTypes.bool,
  icon: PropTypes.string
};

ButtonInput.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  ghost: false,
  icon: ''
};
