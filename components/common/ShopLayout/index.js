import React, { useState } from 'react';
import CategoryFilter from '../CategoryFilter';

const ShopLayout = (props) => {
  const { children, categories, categorySelected, onSetCategory } = props;

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
        />
      </section>
      <section className="right-side">
        {children}
      </section>
    </div>
  );
};

export default ShopLayout;
