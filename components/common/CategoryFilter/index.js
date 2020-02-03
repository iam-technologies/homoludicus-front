import React, { useState } from 'react';
import SearchBar from '../../SearchBar';

const CategoryFilter = (props) => {
  const { inputValue, handleInputChange, categories } = props;
  // console.log(categories)

  const onShowClick = (e) => {
    if (e.target.className === 'category-title') {
      e.target.className = 'category-title-open';
    } else if (e.target.className === 'category-title-open') {
      e.target.className = 'category-title';
    }
    console.log(e.target.className);
  };

  return (
    <>
      <SearchBar inputValue={inputValue} handleInputChange={handleInputChange} />

      <div className="categories-div">
        <h5>Filtrar per categoria</h5>
        {categories.map((category, i) => {
          return (
            <>
              <div className="category-div">
                <input type="checkbox" className="category-in" id={category.name.es} name="rd" />
                <label className="tab-label" htmlFor={category.name.es}>
                  {category.name.es}
                </label>
                <div className="tab-content">
                  {category.childrens.map((child) => {
                    return <p>{child.name.es}</p>;
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoryFilter;
