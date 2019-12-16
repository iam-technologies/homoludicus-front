import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class CheckInput extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { path, value, onChange, disabled } = this.props;
    if (disabled) return;
    const newVaule = !value;

    onChange(path, newVaule);
  }


  render() {
    const { className, label, value } = this.props;

    return (
      <div
        className={`check_input_ui ${className}`}
        onClick={this.onClick}
      >
        <div
          className={`check ${value ? 'active' : ''}`}
        >
          <span className="circle" />
        </div>
        <p className="label">{label}</p>
      </div>
    );
  }
}


CheckInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  path: PropTypes.string,
  value: PropTypes.bool
};

CheckInput.defaultProps = {
  className: '',
  path: '',
  value: false
};
