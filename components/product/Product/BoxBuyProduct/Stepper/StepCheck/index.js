import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { dataFormat, priceCalc } from '../../../../../../utils';
import WrapperStep from '../WrapperStep';
import Check from './Check';


export default class StepCheck extends PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(keyPath, item, price) {
    const { onCheck, checked } = this.props;
    const isChecked = checked.indexOf(keyPath);

    if (isChecked !== -1) {
      onCheck(keyPath, item, price, isChecked !== -1, false);
    } else {
      onCheck(keyPath, item, price, isChecked !== -1);
    }
  }


  render() {
    const { items, checked } = this.props;

    return (
      <WrapperStep
        title="Selecciona los productos que quieres personalizar:"
      >
        <div className="step-check">
          {
            items.map((elem) => {
              const keyPath = dataFormat.getPathKeyConfig(elem, true);
              const { mandatory } = elem;
              if (mandatory) return null;

              return (
                <Check
                  checked={checked.indexOf(keyPath) !== -1}
                  item={elem}
                  key={keyPath}
                  keyPath={keyPath}
                  onClick={this.onClick}
                  price={priceCalc.attribute({}, elem)}
                />
              );
            })
          }
        </div>
      </WrapperStep>
    );
  }
}


StepCheck.propTypes = {
  checked: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired
};
