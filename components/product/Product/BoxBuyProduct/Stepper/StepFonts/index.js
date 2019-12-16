import React from 'react';

import { dataFormat, priceCalc } from '../../../../../../utils';
import WrapperStep from '../WrapperStep';
import StepFont from './StepFont';


export default ({ item, config, title, pathKey, generalConfig }) => (
  <WrapperStep
    title={title}
  >
    <div className="step-fonts">
      {
        item.values.map((v) => {
          const elem = dataFormat.getDefaultProperties(v, item);

          return (
            <StepFont
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
