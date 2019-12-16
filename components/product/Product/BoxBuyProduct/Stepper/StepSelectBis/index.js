import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';

// MATERIAL-UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import PropTypes from 'prop-types';

import { withWindowResize } from '../../../../../hoc';

import { configAttrActs, showImgAttributeActs } from '../../../../../../redux/actions';
import { dataFormat, priceCalc } from '../../../../../../utils';
import { Image } from '../../../../../common';
import WrapperStep from '../WrapperStep';

// "OVERRIDING" MUI COMPONENT STYLES https://material-ui.com/customization/globals/#css
const theme = createMuiTheme({
  overrides: {
    root: {
      maxHeight: '200px',
      width: '325px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formControl: {
      root: {
        minWidth: '120px',
        width: '280px'
      }
    },
    MuiInputLabel: {
      root: {
        disableAnimation: 'false',
        marginTop: '-27px',
        width: '280px',
        height: '40px',
        color: 'rgb(217,217,217)',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&$focused': { // increase the specificity for the pseudo class
          color: 'transparent'
        }
      },
      shrink: {
        transform: 'none',
        top: '24px'
      }
    },
    MuiSelect: {
      root: {
        width: '280px',
        marginTop: '-20px'
      },
      icon: {
        color: 'rgb(217,217,217)',
        top: '-10px'
      },
      select: {
        '&:focus': {
          background: 'red'
        }
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
        height: '20px',
        width: '100%'
      },
      input: {
        marginLeft: '5px',
        color: 'rgb(109, 109, 109)',
        '&$focused': { // increase the specificity for the pseudo class
          backgroundColor: 'green'
        }
      }
    }
  }
});

const StepSelectBis = (props) => {
  const onAddAttr = bindActionCreators(configAttrActs, props.dispatch);
  const onShowImg = bindActionCreators(showImgAttributeActs, props.dispatch);
  const { config, title, item, screen } = props;

  const titleToShow = title.length > 25 ? `${title.substr(0, 25)}...` : title;

  const onChange = (e) => {
    const selectedValue = e.target.value;
    const { item, pathKey } = props;
    const { values } = item;
    const elem = values.filter(el => el.key === selectedValue);
    const price = priceCalc.attribute(elem[0], item);

    onAddAttr.add({ [pathKey]: { item, key: selectedValue, price, value: elem[0] } });
  };

  const onMouseEnter = (elem) => {
    const { item } = props;
    const img = dataFormat.getPreviewImg(item, elem);

    if (img) {
      onShowImg.show(img);
    }
  };

  const onMouseLeave = (elem) => {
    const { item } = props;
    const img = dataFormat.getPreviewImg(item, elem);

    if (img) {
      onShowImg.remove();
    }
  };

  const value = _.get(config, 'key', null);

  return (
    <WrapperStep
      title={title}
    >
      <div className="step-select">
        <div className="select_ui">
          <ThemeProvider theme={theme}>
            <form
              variant="standard"
              autoComplete="off"
            >
              <FormControl>
                <InputLabel>
                  {value ? '' : titleToShow}
                </InputLabel>

                <Select
                  value={value}
                  disableUnderline
                  fullWidth
                  onChange={onChange}
                >
                  {
                    item.values.map((v) => {
                      const elem = dataFormat.getDefaultProperties(v, item);


                      const isAvailable = _.get(elem, 'properties.availability', false);
                      if (!isAvailable) return null;

                      const price = priceCalc.attribute(elem, item);
                      const img = _.get(elem, 'properties.imgMini', '');

                      const mouseEvents = {};
                      if (screen === 'lg') {
                        mouseEvents.onMouseEnter = () => onMouseEnter(elem);
                        mouseEvents.onMouseLeave = () => onMouseLeave(elem);
                      }

                      return (
                        <MenuItem
                          key={elem.key}
                          leftIcon={img ? <Image className="select_ui-item_img" src={img} size="mobile" /> : null}
                          onClick={() => onMouseLeave(elem)}
                          value={elem.key}
                          {...mouseEvents}
                        >
                          {<span>{`${_.get(elem, 'name.es', '')} ${price === 0 ? '' : `+${dataFormat.formatCurrency(price, true)}`}`}</span>}

                        </MenuItem>
                      );
                    })
                  }

                </Select>

              </FormControl>
            </form>

          </ThemeProvider>

        </div>
      </div>

    </WrapperStep>
  );
};


StepSelectBis.propTypes = {
  config: PropTypes.object,
  item: PropTypes.object.isRequired,
  pathKey: PropTypes.string.isRequired,
  title: PropTypes.string
};

StepSelectBis.defaultProps = {
  config: {},
  title: ''
};

export default connect(null, {
  add: configAttrActs.add,
  show: showImgAttributeActs.show,
  remove: showImgAttributeActs.remove
})(withWindowResize(StepSelectBis));
