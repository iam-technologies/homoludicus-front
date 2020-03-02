import React, { useState } from 'react';
import CategoryFilter from '../CategoryFilter';

const ShopLayout = (props) => {
  const {
    children,
    categories,
    categorySelected,
    onSetCategory,
    generics,
    onSetHability,
    onSetAge,
    onSetPlayers,
    onDeleteFilter,
    category,
    filterSelected,
    setFilterSelected
  } = props;


  console.log(category, 'category');

  // Searcher
  const initialValue = '';
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div className="shop-page">
      <section className="left-side">
        <CategoryFilter
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          categories={categories}
          onSetCategory={onSetCategory}
          categorySelected={categorySelected}
          generics={generics}
          onSetHability={onSetHability}
          onSetAge={onSetAge}
          onSetPlayers={onSetPlayers}
          onDeleteFilter={onDeleteFilter}
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
        />
      </section>
      <section className="right-side">
        {children}
      </section>
    </div>
  );
};

export default ShopLayout;
