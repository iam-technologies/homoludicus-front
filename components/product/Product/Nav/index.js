import React from 'react';

import Router from 'next/router';
import { isClient } from '../../../../serverServices/utils';
import { SocialNav } from '../../../common';

const goBack = () => {
  Router.back();
};

const Nav = ({ item }) => {
  return (
    <div className="a_p-nav">
      {
        isClient && window.history.length >= 2 ? (
          <div
            onClick={goBack}
          >
            <a className="a_p-nav-btn_return">
              <div className="icon_preview" />
              <p>Volver al listado</p>
            </a>
          </div>
        ) : (
          <div />
        )
      }

      <SocialNav item={item} />
    </div>
  );
};

export default Nav;


// import React from 'react';

// import { isClient } from '../../../../serverServices/utils';
// import { SocialNav } from '../../../common';


// export default class Nav extends React.Component {
//   constructor(props) {
//     super(props);

//     this.goBack = this.goBack.bind(this);
//   }

//   goBack() {
//     window.history.back();
//   }

//   render() {
//     const { item } = this.props;
//     return (
//       <div className="a_p-nav">
//         {
//           isClient && window.history.length >= 2 ? (
//             <div
//               onClick={this.goBack}
//             >
//               <a className="a_p-nav-btn_return">
//                 <div className="icon_preview" />
//                 <p>Volver al listado</p>
//               </a>
//             </div>
//           ) : (
//             <div />
//           )
//         }

//         <SocialNav item={item} />
//       </div>
//     );
//   }
// }
