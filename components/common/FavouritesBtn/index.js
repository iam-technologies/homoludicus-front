import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';

import { api } from '../../../serverServices';

import { showLoginActs } from '../../../redux/actions';

class FavouritesBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favourite: false
    };

    this.showLogin = bindActionCreators(showLoginActs, props.dispatch);

    this.onAdd = this.onAdd.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    api.favourites.check(id, (error, res) => {
      if (res) {
        this.setState({ favourite: res.data });
      }
    });
  }

  onAdd() {
    const { favourite } = this.state;
    const { id } = this.props;

    if (!favourite) {
      api.favourites.add(id, (error, res) => {
        if (res) {
          if (res.data === 1) {
            this.setState({ favourite: true });
            Alert.info('Producto añadido a tus favoritos');
          } else {
            Alert.info('Debes haber hecho login para utilizar esta función');
            this.showLogin.show();
          }
        }
      });

      return;
    }

    api.favourites.remove(id, (error, res) => {
      if (res) {
        this.setState({ favourite: false });

        Alert.info('Producto eliminado de tus favoritos');
      }
    });
  }


  render() {
    const { favourite } = this.state;

    return (
      <div
        className={`favourite_ui ${favourite ? 'favourite_ui-checked' : ''}`}
        onClick={this.onAdd}
        title="Añadir a mis favoritos"
      />
    );
  }
}


FavouritesBtn.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(state => ({ isLogin: state.isLogin.login }))(FavouritesBtn);
