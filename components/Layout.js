import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withWindowResize } from './hoc';
import { windowResizeActs } from '../redux/actions';

import Footer from './Footer';
import NavBar from './Navbar';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.onWindowResize = bindActionCreators(windowResizeActs, props.dispatch);
  }

  componentDidMount() {
    this.onWindowResize.listener();
  }

  render() {
    const { children, pathname } = this.props;
    return (

      <Fragment>
        <NavBar pathname={pathname} />
        {children}
        <Footer />
      </Fragment>
    );
  }
}

export default connect()(withWindowResize(Layout));


// import React, { Fragment } from 'react';

// import Footer from './Footer';
// import NavBar from './Navbar';

// const Layout = ({ children, pathname }) => {
//   return (
//     <Fragment>
//       <NavBar pathname={pathname} />
//       {children}
//       <Footer />
//     </Fragment>
//   );
// };

// export default (Layout);
