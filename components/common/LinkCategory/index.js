import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '../../../routes';
import { urlUtils } from '../../../utils';

const LinkCategory = ({ id, className, children, onClick }) => {
  const pathname = urlUtils.linkToCategory(id);
  return (
    <Link route={`${pathname}`}>
      <a
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

LinkCategory.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

LinkCategory.defaultProps = {
  className: 'link_ui',
  onClick: () => {}
};

LinkCategory.displayName = 'LinkCategory';

export default React.memo(LinkCategory);
