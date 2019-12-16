import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { configAttrActs } from '../../../../../redux/actions';
import { dataFormat, priceCalc } from '../../../../../utils';
import StepCheck from './StepCheck';
import StepFonts from './StepFonts';
import StepInput from './StepInput';
import StepColors from './StepColors';
// import StepSelect from './StepSelect';
import StepSelectBis from './StepSelectBis';
import StepUpload from './StepUpload';


class Stepper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexTab: 0,
      checked: [],
      items: props.items,
      maxTab: props.items.length - 1
    };

    this.onAddAttr = bindActionCreators(configAttrActs, props.dispatch);
    this.onPrevTab = this.onPrevTab.bind(this);
    this.onNextTab = this.onNextTab.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.getSteps = this.getSteps.bind(this);
  }

  // Not delete untill check new componentDidMount.
  // componentDidMount() {
  //   const { items, checked } = this.state;
  //   const { isPack, config } = this.props;

  //   if (isPack) {
  //     const checkItems = items[0].attr;

  //     if (checked.length > 0 && checkItems && checkItems.length > 0) {
  //       const newItems = [...items];

  //       const checkGood = [];
  //       checked.forEach((el) => {
  //         const { item } = config[el];
  //         const subStr = el.substr(0, el.indexOf('-') + 1);
  //         if (item.type === 'text' && checkGood.filter(e => e.indexOf(subStr) !== -1).length > 0) {
  //           return;
  //         }

  //         checkGood.push(el);
  //         newItems.splice(checkGood.length, 0, ...checkItems.filter(e => e.keyPath === el));
  //       });

  //       this.setState({ items: newItems, maxTab: newItems.length - 1 });
  //     }
  //   }
  // }

  componentDidMount() {
    // index !== -1 means that is an update cart product
    const { isPack, config, index } = this.props;

    // If isPack and has mandatory products attributes,
    // make the same actions than onCheck
    if (isPack) {
      const { checked, items: oldItems } = this.state;
      const items = [...oldItems];

      const checkItems = items[0].attr || [];

      // mandatory items if is not an update cart product
      if (index === -1) {
        checkItems.map((attr) => {
          if (attr.mandatory) checked.push(attr.keyPath);
        });
      }

      if (checked.length > 0 && checkItems && checkItems.length > 0) {
        // We need an array to see if we have more than one attribute equal.
        const checkForInputOnlyOne = [];

        checkItems.forEach((item) => {
          const keyPath = dataFormat.getPathKeyConfig(item, true);
          const isChecked = checked.indexOf(keyPath) !== -1;

          if (isChecked) {
            const price = priceCalc.attribute({}, item);

            const inputOnlyOne = item.type !== 'text' ? 0
              : checkForInputOnlyOne.filter(elem => elem.indexOf(keyPath.split('-')[0]) !== -1).length;

            checkForInputOnlyOne.push(item.keyPath);

            if (inputOnlyOne === 0) {
              const numItems = items.filter(el => el.refProduct).length + 1;
              items.splice(numItems, 0, item);
            }

            if (!config) {
              this.onAddAttr.add({ [keyPath]: { item, price } });
            }
          }
        });

        if (checked.length === checkItems.length) {
          items.shift();
        }

        this.setState({ items });
      }
    }
  }

  /**
 * Change tab in stepper-main
 */
  onPrevTab() {
    const { indexTab } = this.state;

    if (indexTab > 0) {
      this.setState({ indexTab: indexTab - 1 });
    }
  }

  onNextTab() {
    const { indexTab, maxTab } = this.state;

    if (indexTab < maxTab) {
      this.setState({ indexTab: indexTab + 1 });
    } else {
      this.props.onAddToCart();
    }
  }


  /**
 * Select Item in check
 */
  onCheck(keyPath, item, price, isChecked, add = true) {
    const { checked, items: oldItems } = this.state;
    const { config } = this.props;
    const items = [...oldItems];

    if (add) {
      const inputOnlyOne = item.type !== 'text' ? 0
        : checked.filter(elem => elem.indexOf(keyPath.split('-')[0]) !== -1).length;

      if (inputOnlyOne === 0) {
        const numItems = items.filter(el => el.refProduct).length + 1;
        items.splice(numItems, 0, item);
      }

      this.onAddAttr.add({ [keyPath]: !isChecked ? { item, price } : {} });
    } else {
      const index = items.findIndex(el => el.keyPath === keyPath);
      const newChecked = checked.filter(el => el !== keyPath);

      if (index !== -1) {
        items.splice(index, 1);
      }

      if (item.type === 'text') {
        const inputItem = newChecked.filter(elem => elem.indexOf(keyPath.split('-')[0]) !== -1);

        if (inputItem.length > 0 && index !== -1) {
          const newItem = items[0].attr.filter(el => el.keyPath === inputItem[0])[0];

          items.splice(index, 0, newItem);
        }
      }

      this.onAddAttr.remove(config, keyPath);
    }

    this.setState({ items });
  }


  /**
 * Get steps to show
 */
  getSteps(items, config, checked, isPack) {
    const steps = items.map((elem, index) => {
      const pathKey = dataFormat.getPathKeyConfig(elem, isPack);
      const stepConfig = _.get(config, pathKey, {});
      let title = _.get(elem, 'label.es', '');

      if (title === '') {
        if (elem.type === 'text') {
          title = `Escribe ${_.get(elem, 'name.es', '')}`;
        } else {
          title = `Seleccione ${_.get(elem, 'name.es', '')}`;
        }
      }

      if (isPack && elem.refProduct && elem.type !== 'text') {
        const nameProduct = _.get(elem, 'refProduct.name.es', '');
        title += nameProduct ? ` en ${nameProduct}` : '';
      }

      switch (elem.type) {
        case 'size':
          return (
            <StepSelectBis
              config={stepConfig}
              item={elem}
              key={pathKey + index.toString()}
              pathKey={pathKey}
              title={title}
            />
          );

        case 'color':
          return (
            <StepColors
              generalConfig={config}
              config={stepConfig}
              item={elem}
              key={pathKey + index.toString()}
              pathKey={pathKey}
              title={title}
            />
          );

        case 'font':
          return (
            <StepFonts
              generalConfig={config}
              config={stepConfig}
              item={elem}
              key={pathKey + index.toString()}
              pathKey={pathKey}
              title={title}
            />
          );

        case 'text':
          return (
            <StepInput
              allConfig={config}
              config={stepConfig}
              item={elem}
              key={pathKey + index.toString()}
              pathKey={pathKey}
              title={title}
            />
          );

        case 'other':
          return (
            <StepSelectBis
              config={stepConfig}
              item={elem}
              key={pathKey + index.toString()}
              pathKey={pathKey}
              title={title}
            />
          );

        case 'image':
          return (
            <StepUpload
              config={stepConfig}
              item={elem}
              key={pathKey + index.toString()}
              pathKey={pathKey}
              title={title}
            />
          );

        case 'check':
          return (
            <StepCheck
              checked={checked}
              items={_.get(elem, 'attr', [])}
              key={`check${index.toString()}`}
              onCheck={this.onCheck}
            />
          );

        default:
          return null;
      }
    });

    return steps;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isPack) {
      const checked = Object.keys(props.config).filter(elem => elem.indexOf('-') !== -1);
      const maxTab = state.items.length - 1;

      return { checked, maxTab };
    }

    return null;
  }

  render() {
    const { indexTab, maxTab, items, checked } = this.state;
    const { config, isPack, typeNotAvailable, productName } = this.props;

    if (items.length < 1) return null;

    return (
      <section className="a_p-stepper">
        <div className="stepper-top">
          <h2>Personaliza tu {productName}</h2>
          <p className="stepper-step">{indexTab + 1} de {maxTab + 1}</p>
        </div>

        <div className="stepper-main">
          <SwipeableViews
            disabled
            index={indexTab}
          >
            {
              this.getSteps(items, config, checked, isPack)
            }
          </SwipeableViews>
        </div>

        <div className="stepper-bottom">

          <button
            type="button"
            className={`stepper-prev ${indexTab === 0 ? 'disable' : ''}`}
            onClick={this.onPrevTab}
          >
            <span className="icon_stepper" />
          </button>

          <button
            type="button"
            className="stepper-next"
            onClick={() => {
              if (!typeNotAvailable) this.onNextTab();
            }}
          >
            {
            typeNotAvailable
              ? <span>No disponible</span>
              : (indexTab === maxTab ? <span>Añadir al carrito</span> : <span>Continuar <span className="icon_stepper" /></span>)
            }
          </button>

        </div>
      </section>
    );
  }
}


export default connect()(Stepper);
