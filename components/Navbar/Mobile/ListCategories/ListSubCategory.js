import _ from 'lodash';
import React from 'react';

import { LinkCategory } from '../../../common';


const ListSubCategory = ({ items, onClick }) => (
  <div className="category">
    {
      items.map((elem) => {
        const id = elem._id;
        const childrens = _.get(elem, 'childrens', []);
        const size = childrens.length;

        return (
          <div className="list" key={id} >

            <LinkCategory
              className="sub_link"
              id={id}
              onClick={onClick}
            >
              {_.get(elem, 'name.es', '')}
            </LinkCategory>
            {
              size > 0 && (
                childrens.map(child => (
                  <p className="sub_child_list" key={child._id}>
                    <LinkCategory
                      className="sub_child"
                      id={child._id}
                      onClick={onClick}
                    >
                      {_.get(child, 'name.es', '')}
                    </LinkCategory>
                  </p>
                ))
              )
            }
          </div>
        );
      })
    }
  </div>
);

export default ListSubCategory;
