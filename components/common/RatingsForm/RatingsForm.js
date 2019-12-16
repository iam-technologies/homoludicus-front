import _ from 'lodash';
import Alert from 'react-s-alert';
import Loader from 'react-loaders';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { api } from '../../../serverServices';
import { msgUI, checkFields } from '../../../utils';
import ButtonInput from '../ButtonInput';
import Image from '../Image';
import Rating from '../Rating';
import TextArea from '../TextArea';


export default class RatingsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errors: [],
      item: {},
      saving: false
    };

    this.onStopPropagation = this.onStopPropagation.bind(this);
    this.onClose = props.onClose.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onChange(path, value) {
    const { item } = this.state;

    _.set(item, path, value);

    this.setState({ item });
  }

  onStopPropagation(e) {
    e.stopPropagation();
  }

  onAccept() {
    const { item, saving } = this.state;
    const { orderId, product, onSave } = this.props;
    const { indexOrder, _id: productId } = product;

    if (saving) return;
    this.setState({ saving: true });
    const { score } = item;

    if (score <= 0 || !score) {
      const errors = [...checkFields.isRequired(score, 'score')];
      if (errors.length > 0) {
        this.setState({ saving: false, errors });
        return;
      }
    }

    const newItem = { ...item, orderId, indexOrder, productId };

    api.ratings.upsert(newItem, (error, res) => {
      if (res) {
        this.setState({ saving: false });

        Alert.info('Valoración guardada.');

        this.onClose();

        if (!newItem._id) { onSave(); }
        return;
      }

      this.setState({ saving: false, errors: error.data || [] });
    });
  }

  getData() {
    const { product } = this.props;

    if (!product.ratingId) {
      this.setState({ loading: false });
      return;
    }

    api.ratings.getById(product.ratingId, (error, res) => {
      if (res) {
        this.setState({ item: res.data || {}, loading: false });
        return;
      }

      Alert.warning('Ha ocurrido un error al intentar obtener la valoración.');
      this.onClose();
    });
  }


  render() {
    const { item, errors, saving, loading } = this.state;
    const { product } = this.props;

    if (loading) {
      return (
        <div className="rating_form_ui-loading">
          <Loader type="ball-spin-fade-loader" color="#97DECC" />
        </div>
      );
    }

    const image = _.get(product, 'img.0', '');
    const title = _.get(product, 'name.es', '');

    const errorScore = msgUI.get(errors, 'score');

    return (
      <div
        className="rating_form_ui-container"
        onClick={this.onStopPropagation}
      >
        <div className="rating_form_ui-card">
          {
            image && (
              <div className="rating_form_ui-card-img">
                <Image
                  fitContent
                  alt={title}
                  mobile="mobile"
                  src={image}
                />
              </div>
            )
          }
          <p className="rating_form_ui-card-title">{title}</p>
        </div>

        <div className="rating_form_ui-form_fields">
          {
            errorScore && (
              <p className="rating_form_ui-error_score">Debe indicar alguna puntuación.</p>
            )
          }
          <Rating
            bigger
            initialRating={_.get(item, 'score', 0)}
            onChange={value => this.onChange('score', value)}
          />

          <TextArea
            className="rating_form_ui-textarea"
            error={msgUI.get(errors, 'comment')}
            hintLabel="Cuenta a los demás lo que opinas de este producto..."
            label="Tu opinión cuenta"
            maxWidth
            onChange={this.onChange}
            path="comment"
            value={_.get(item, 'comment', '')}
          />

          <div className="rating_form_ui-btns">
            <ButtonInput
              ghost
              className="rating_form_ui-btn"
              label="Cancelar"
              onClick={this.onClose}
            />

            <ButtonInput
              ghost
              className="rating_form_ui-btn"
              label={saving ? <Loader type="ball-beat" color="#97DECC" /> : 'Guardar'}
              onClick={this.onAccept}
            />
          </div>
        </div>
      </div>
    );
  }
}


RatingsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired
};
