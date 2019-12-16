import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { path } = this.props;
    const { value } = e.target;

    this.props.onChange(path, value);
  }

  render() {
    const {
      className, maxWidth, label, error,
      hintLabel, required, type, value, onKeyPress, disabled
    } = this.props;

    return (
      <div
        className={`text_input_ui${maxWidth ? '-max_width' : ''} ${error ? 'error' : ''} ${className}`}
      >
        {
          !label ? null : (<p className="text_input_ui-label">{label}</p>)
        }
        <input
          className="text_input_ui-field"
          placeholder={hintLabel}
          onChange={this.onChange}
          required={required}
          type={type}
          value={value}
          onKeyPress={onKeyPress}
          disabled={disabled}
        />

        {
          error && (<span className="text_input_ui-error">{error}</span>)
        }
      </div>
    );
  }
}


TextInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  hintLabel: PropTypes.string,
  label: PropTypes.string,
  maxWidth: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  path: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.node,
  onKeyPress: PropTypes.func,
  disabled: PropTypes.bool
};

TextInput.defaultProps = {
  className: '',
  error: '',
  hintLabel: '',
  label: '',
  maxWidth: false,
  path: '',
  required: false,
  type: 'text',
  value: '',
  onKeyPress: undefined,
  disabled: false
};
