import React from 'react';

const SearchBar = ({ handleInputChange, inputValue }) => {
  return (
      <div className="searcher-div">
          <img src="/images/icon_search_gray.png" />
          <input
              type="text"
              className="product-filter"
              onChange={handleInputChange}
              value={inputValue}
              name="search"
            />
        </div>
  );
};

export default SearchBar;
