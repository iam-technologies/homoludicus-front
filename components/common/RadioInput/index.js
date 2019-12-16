import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class RadioInput extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }


  onClick() {
    const { path, label, value, onChange } = this.props;
    let newVaule = value;

    if (newVaule === '') {
      newVaule = label;
    }

    onChange(path, newVaule);
  }


  render() {
    const { className, active, children } = this.props;

    return (
      <div
        className={`radio_input_ui ${className}`}
        onClick={this.onClick}
      >
        <div
          className={`radio ${active ? 'active' : ''}`}
        >
          <span className="circle" />
        </div>
        <div className="label">{children}</div>
      </div>
    );
  }
}


RadioInput.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  path: PropTypes.string,
  value: PropTypes.any
};

RadioInput.defaultProps = {
  active: false,
  className: '',
  path: '',
  value: ''
};
