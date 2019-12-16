import _ from 'lodash';
import React from 'react';

import { LinkCategory } from '../../common';

class ListSubCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false

    };

    this.closeMenu = this.closeMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  // componentDidMount() {
  //   const { items } = this.props;

  //   this.setState({ items });
  // }

  // componentDidUpdate(prevProps) {
  //   const { items } = this.props;
  //   console.log('items: ', items);

  //   if (prevProps.items !== items) {
  //     this.setState({ items });
  //   }
  // }

  closeMenu() {
    console.log('close menu launched');
    this.setState({ shown: false });
  }

  showMenu() {
    this.setState({ shown: true });
  }

  render() {
    const { shown } = this.state;
    const { items = [] } = this.props;

    return (
      <ul
        className={`subnav ${shown ? '' : 'hide'}`}
        onMouseOver={this.showMenu}
      >
        <li className="category">
          {
            items.map(elem => (
              <div className="list" key={elem._id}>

                <LinkCategory
                  className="title"
                  id={elem._id}
                  onClick={this.closeMenu}
                >
                  {_.get(elem, 'name.es', '')}
                </LinkCategory>
                {
                  _.get(elem, 'childrens', []).length > 0 && (
                    elem.childrens.map(child => (
                      <p key={child._id}>
                        <LinkCategory
                          className="sub_link"
                          id={child._id}
                          onClick={this.closeMenu}
                        >
                          {_.get(child, 'name.es', '')}
                        </LinkCategory>
                      </p>
                    ))
                  )
                }
              </div>
            ))
          }
        </li>
      </ul>

    );
  }
}


export default ListSubCategory;
