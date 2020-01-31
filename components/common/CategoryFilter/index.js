import React from 'react';
import SearchBar from '../../SearchBar';

const CategoryFilter = (props) => {
  const { inputValue, handleInputChange, categories } = props;
  console.log(categories)

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
                <hr />
              </div>
              <div className="sub-category-div">
                {category.childrens.map(child => {
                  return <p>{child.name.es}</p>
                })}
              </div>
            </>
          )
        })}
      </div>
    </>
  );
};

export default CategoryFilter;

