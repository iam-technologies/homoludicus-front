import _get from 'lodash/get';
import React from 'react';
import Link from 'next/link';

import { imgServices } from '../../../serverServices';
import { urlUtils } from '../../../utils';

const Grid = ({ items }) => {
  const getGrid = (elems) => {
    return elems.map((item) => {
      const color = _get(item, 'color', '#B6CFD4');
      const imgUrl = _get(item, 'imgUrl', '');
      const text = _get(item, 'text.es', '');
      const target = _get(item, 'link.target', false);
      const url = _get(item, 'link.url', '#');

      const link = target ? url : urlUtils.urlToPathLink(url);

      const background = imgUrl ? `url(${imgServices.getUrl(imgUrl)})` : color;

      if (target) {
        return (
          <a
            key={item.id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="categories_link"
            style={{ background }}
          >
            <p>{text}</p>
          </a>
        );
      }

      return (
        <Link
          key={item.id}
          href={link}
        >
          <a className="categories_link" style={{ background }}>
            <p>{text}</p>
          </a>
        </Link>
      );
    });
  };

  if (items.length < 1) return null;

  const grid = getGrid(items);

  return (
    <div className={`home_categories home_categories_${items.length}`}>
      { grid }
    </div>
  );
};

export default Grid;
