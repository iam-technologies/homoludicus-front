import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class TextArea extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    const { path, onChange } = this.props;
    const { value } = e.target;

    onChange(path, value);
  }


  render() {
    const { className, maxWidth, label, error, hintLabel, required, value, disabled } = this.props;


    return (
      <div
        className={`textarea_input_ui${maxWidth ? '-max_width' : ''} ${error ? 'error' : ''} ${className}`}
      >
        {
          !label ? null : (<p className="textarea_input_ui-label">{label}</p>)
        }
        <textarea
          className="textarea_input_ui-field"
          placeholder={hintLabel}
          onChange={this.onChange}
          required={required}
          value={value}
          disabled={disabled}
        />

        {
          error && (<span className="textarea_input_ui-error">{error}</span>)
        }
      </div>
    );
  }
}


TextArea.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  hintLabel: PropTypes.string,
  label: PropTypes.string,
  maxWidth: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  path: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.node,
  disabled: PropTypes.bool
};

TextArea.defaultProps = {
  className: '',
  error: '',
  hintLabel: '',
  label: '',
  maxWidth: false,
  path: '',
  required: false,
  value: '',
  disabled: false
};
