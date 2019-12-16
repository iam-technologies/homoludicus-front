import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { imgServices } from '../../../../../../serverServices';
import { priceCalc } from '../../../../../../utils';
import { configAttrActs } from '../../../../../../redux/actions';
import WrapperStep from '../WrapperStep';


class StepUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      preview: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onAddAttr = bindActionCreators(configAttrActs, props.dispatch);
  }


  static getDerivedStateFromProps(props) {
    const preview = _.get(props.config, 'key', '');

    if (preview) {
      return {
        loaded: false,
        preview
      };
    }

    return null;
  }

  onUpload(files) {
    const file = files[0];

    this.setState({ loaded: true });
    imgServices.encodeBase64(file, (error, res) => {
      if (res) {
        this.onChange(res);
      }
    });
  }

  onChange(image) {
    const { item, pathKey } = this.props;

    const key = image;
    const price = priceCalc.attribute({}, item);

    this.onAddAttr.add({ [pathKey]: { item, key, price } });
  }


  render() {
    const { preview, loaded } = this.state;
    const { title } = this.props;


    return (
      <WrapperStep
        title={title}
      >
        <div className="step-upload">
          {
            !preview
              ? null
              : <img src={preview} className="img_preview_upload" alt="Uploaded" />
          }

          <Dropzone
            accept="image/*"
            activeClassName="active"
            className="upload_dropzone"
            maxSize={10000000}
            multiple={false}
            onDrop={loaded ? () => {} : this.onUpload}
          >
            {
              loaded
                ? <div className="progress_upload"><CircularProgress color="#97DECC" /></div>
                : <p>Arrastrar para subir una imagen aquí.</p>
            }
          </Dropzone>
        </div>
      </WrapperStep>
    );
  }
}


StepUpload.propTypes = {
  config: PropTypes.object,
  item: PropTypes.object.isRequired,
  pathKey: PropTypes.string.isRequired,
  title: PropTypes.string
};

StepUpload.defaultProps = {
  config: {},
  title: ''
};

export default connect()(StepUpload);
