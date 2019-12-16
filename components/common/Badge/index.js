import React from 'react';


export default ({
  className = '',
  discount = false,
  products = false,
  order = false,
  small = false,
  children
}) => (
  <div
    className={
      `badge_ui${order ? '-orders' : ''}${products ? '-products' : ''} ${small ? 'small' : ''} ${className} ${discount ? 'badge_ui-discount' : ''}`
    }
  >
    {children}
  </div>
);
