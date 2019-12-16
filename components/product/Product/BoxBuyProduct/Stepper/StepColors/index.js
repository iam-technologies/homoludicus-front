import React from 'react';

import { dataFormat, priceCalc } from '../../../../../../utils';
import WrapperStep from '../WrapperStep';
import StepColor from './StepColor';


export default ({ item, config, title, pathKey, generalConfig }) => (
  <WrapperStep
    title={title}
  >
    <div className="step-colors">
      {
        item.values.map((v) => {
          const elem = dataFormat.getDefaultProperties(v, item);

          return (
            <StepColor
              generalConfig={generalConfig}
              config={config}
              pathKey={pathKey}
              item={elem}
              itemParent={item}
              key={elem.key}
              price={priceCalc.attribute(elem, item)}
            />
          );
        })
      }
    </div>
  </WrapperStep>
);
