import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LinkCategory } from '../../../common';
import ListSubCategory from './ListSubCategory';


export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = { active: '' };

    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    let { active } = this.state;

    active = active === id ? '' : id;
    this.setState({ active });
  }


  render() {
    const { items, onCloseNav } = this.props;
    const { active } = this.state;


    return (
      <div className="nav_center">
        <ul className="nav_center-ul">
          {
            items.map((elem) => {
              const id = elem._id;
              const childrens = _.get(elem, 'childrens', []);
              const size = childrens.length;
              const checkActive = active === id;

              return (
                <li
                  className="item_link"
                  key={id}
                >
                  <div className="main_link">
                    <LinkCategory
                      id={id}
                      onClick={onCloseNav}
                    >
                      {_.get(elem, 'name.es', '')}
                    </LinkCategory>

                    {
                      size > 0 && (
                        <button
                          className={`btn_more_categories ${checkActive ? 'active' : ''}`}
                          onClick={() => this.onClick(id)}
                          type="button"
                        >
                          <img src="/images/icon_down_white.png" alt="Mostrar más categorías" />
                        </button>
                      )
                    }
                  </div>

                  {
                    size > 0 && checkActive ? (
                      <ListSubCategory items={childrens} onClick={onCloseNav} />
                    ) : null
                  }
                </li>

              );
            })
          }
        </ul>
      </div>
    );
  }
}

ListCategories.propTypes = {
  onCloseNav: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};
