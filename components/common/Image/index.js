import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { imgServices } from '../../../serverServices';


export default class Image extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showImg: false,
      fitClassName: ''
    };

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad(e) {
    const naturalWidth = _.get(e, 'target.naturalWidth', '');
    const naturalHeight = _.get(e, 'target.naturalHeight', '');

    const fitClassName = naturalWidth >= naturalHeight ? '' : 'imagen_ui_height';

    this.setState({ showImg: true, fitClassName });
  }

  render() {
    const { showImg, fitClassName } = this.state;
    const { alt, className, size, src, fitContent } = this.props;

    if (!src) return null;

    let newSize = size;
    if (src.indexOf('.gif') !== -1) {
      newSize = 'original';
    }

    return (
      <img
        alt={alt}
        className={`imagen_ui ${showImg ? 'imagen_ui-show' : ''} ${fitContent ? fitClassName : ''} ${className} `}
        onLoad={this.onLoad}
        src={imgServices.getUrl(src, newSize)}
      />
    );
  }
}


Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  fitContent: PropTypes.bool,
  size: PropTypes.string,
  src: PropTypes.string
};

Image.defaultProps = {
  alt: '',
  className: '',
  fitContent: false,
  size: 'mobile_2x',
  src: ''
};
