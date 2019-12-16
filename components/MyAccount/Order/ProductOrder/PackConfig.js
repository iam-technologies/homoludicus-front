import _ from 'lodash';
import React from 'react';

import { dataFormat, priceCalc } from '../../../../utils';
import Check from '../../../product/Product/BoxBuyProduct/Stepper/StepCheck/Check';


export default ({ product, config }) => {
  const keys = Object.keys(config).filter(k => k.indexOf('-') !== -1);
  const attr = _.get(product, 'configStepPack.0.attr', []);

  if (_.get(product, 'type', '') !== 'pack' || keys.length === 0 || attr === '') return null;


  return (
    <div className="pack_config step-check">
      {
        keys.map((elem) => {
          const ids = dataFormat.backIdsPack(elem);
          const item = attr.filter(a => a._id === ids[0] && a.refProduct._id === ids[1]);

          if (item.length > 0) {
            return (
              <Check
                checked
                key={elem}
                keyPath={elem}
                item={item[0]}
                price={priceCalc.attribute({}, elem)}
              />
            );
          }

          return null;
        })
      }
    </div>
  );
};
