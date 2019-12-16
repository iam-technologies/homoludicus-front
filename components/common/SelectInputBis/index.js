import React from 'react';
import PropTypes from 'prop-types';

// import SelectField from 'material-ui/SelectField';
// import SelectField from '@material-ui/core/Select';

// MATERIAL-UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// "OVERRIDING" MUI COMPONENT STYLES https://material-ui.com/customization/globals/#css
const theme = createMuiTheme({
  overrides: {
    root: {
      maxHeight: '200px',
      width: '325px'
    },
    MuiFormControl: {
      root: {
        minWidth: '120px',
        width: '100%',
        height: '54px'
      }
    },
    MuiFormLabel: { // contenedor del Label
      root: {
        marginTop: '20px'
      }
    },
    MuiInputBase: {
      root: {
        margin: '0'
      }
    },
    MuiInputLabel: { // Texto del Label
      root: {
        disableAnimation: 'false',
        marginTop: '-20px',
        width: '280px',
        height: '54px',
        color: 'rgb(153,154,153)',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      shrink: {
        display: 'none'
      }
    },
    MuiSelect: {
      root: {
        height: '54px',
        marginTop: '-5px'
      },
      select: {
        width: '100%',
        marginLeft: '-0px'
      },
      icon: {
        color: 'rgb(217,217,217)',
        top: '0px'
      }
    },
    MuiMenuItem: {
      root: {
        color: 'rgb(109, 109, 109)',
        width: '100%'
      }
    },
    MuiInput: {
      root: {
        width: '100%'
      },
      input: {
        marginLeft: '5px',
        color: 'rgb(109, 109, 109)'
      }
    }
  }
});

const SelectInputBis = (props) => {
  const {
    onChange, address, className, items, label, error, value, disabled
  } = props;

  const onSubmit = (e) => {
    const { path } = props;
    onChange(path, e.target.value);
  };


  return (
    <div
      className={`select_input_ui ${error ? 'error' : ''} ${className}`}
    >
      {
        !label ? null : (<p className="select_input_ui-label">{label}</p>)
      }

      <ThemeProvider theme={theme}>
        <FormControl variant="outlined">
          <InputLabel>
            {label}
          </InputLabel>

          <Select
            value={value}
            disableUnderline
            fullWidth
            onChange={onSubmit}
            disabled={disabled}
          >
            {
          items.map((elem, i) => (
            <MenuItem
              key={elem + i.toString()}
              primarytext={elem}
              value={address ? i : elem}
            >
              {elem}
            </MenuItem>
          ))
        }
          </Select>
        </FormControl>
      </ThemeProvider>

      {
        error && (<span className="select_input_ui-error">{error}</span>)
      }
    </div>
  );
};


Select.propTypes = {
  className: PropTypes.string,
  address: PropTypes.bool,
  error: PropTypes.string,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  disabled: PropTypes.bool
};

Select.defaultProps = {
  address: false,
  className: '',
  error: '',
  label: '',
  disabled: false
};
export default SelectInputBis;
