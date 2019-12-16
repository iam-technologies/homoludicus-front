import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


const withWindowResize = (WrappedComponent) => {
  class windowResize extends PureComponent {
    render() {
      const { screen, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          screen={screen}
        />
      );
    }
  }
  windowResize.displayName = `withWindowResize(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return connect(state => ({ screen: state.windowResize.screen }))(windowResize);
};


export default withWindowResize;
