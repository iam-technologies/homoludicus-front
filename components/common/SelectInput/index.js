// import MenuItem from 'material-ui/MenuItem';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import SelectField from 'material-ui/SelectField';
import SelectField from '@material-ui/core/Select';


export default class SelectInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.styleLabel = {
      color: '#4A4A4A',
      fontSize: '16px',
      paddingLeft: '30px'
    };

    this.style = { height: '53px' };
  }


  onChange(e, index, key) {
    const { path } = this.props;

    this.props.onChange(path, key);
  }


  render() {
    const { address, className, items, label, error, value, disabled } = this.props;

    return (
      <div
        className={`select_input_ui ${error ? 'error' : ''} ${className}`}
      >
        {
          !label ? null : (<p className="select_input_ui-label">{label}</p>)
        }

        <SelectField
          fullWidth
          hintText={label}
          maxHeight={200}
          labelStyle={this.styleLabel}
          style={this.style}
          onChange={this.onChange}
          selectedMenuItemStyle={{ color: '#323C47' }}
          underlineShow={false}
          value={value}
          disabled={disabled}
        >
          {
            items.map((elem, i) => (
              <MenuItem
                key={elem + i.toString()}
                primaryText={elem}
                value={address ? i : elem}
              />
            ))
          }
        </SelectField>

        {
          error && (<span className="select_input_ui-error">{error}</span>)
        }
      </div>
    );
  }
}


SelectInput.propTypes = {
  className: PropTypes.string,
  address: PropTypes.bool,
  error: PropTypes.string,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  disabled: PropTypes.bool
};

SelectInput.defaultProps = {
  address: false,
  className: '',
  error: '',
  label: '',
  disabled: false
};
