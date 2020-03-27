import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withWindowResize } from './hoc';
import { windowResizeActs } from '../redux/actions';

import Footer from './Footer';
import NavBar from './Navbar';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.onWindowResize = bindActionCreators(
      windowResizeActs,
      props.dispatch
    );
  }

  componentDidMount() {
    this.onWindowResize.listener();
  }

  render() {
    const { children, pathname, layout, selection } = this.props;
    return (
      <>
        <NavBar pathname={pathname} />
        {children}
        <Footer selection={selection} />
      </>
    );
  }
}

export default connect()(withWindowResize(Layout));

