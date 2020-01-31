import React, { useState, useRef } from 'react';
import SearchBar from '../../SearchBar';

const CategoryFilter = (props) => {
  const { inputValue, handleInputChange, categories } = props;
  // console.log(categories)

  const defaultState = false;
  const [menuState, setMenuState] = useState(defaultState);

  const toggleMenu = (state) => {
    setMenuState(!state);
    console.log(state);
  };

  const menuClass = menuState ? '-active' : '';


  return (
    <>
      <SearchBar inputValue={inputValue} handleInputChange={handleInputChange} />
      <div className="categories-div">
        <h5>Filtrar per categoria</h5>
        {categories.map((category) => {
          return (
            <>
              <div className="category-div">
                <p key={category._id}>{category.name.es}</p>
                <p onClick={() => toggleMenu(menuState)}>+</p>
                <hr />
              </div>
              <div className={`sub-category-div${menuClass}`}>
                {category.childrens.map((child) => {
                  return <p>{child.name.es}</p>;
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoryFilter;
