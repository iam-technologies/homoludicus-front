import React from 'react';
import CategoryFilter from '../CategoryFilter';

const ShopLayout = (props) => {
  const {
    handleInputChange,
    inputValue,
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
    setFilterSelected,
    ageSelected,
    habilitySelected,
    playersSelected
  } = props;

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
          ageSelected={ageSelected}
          habilitySelected={habilitySelected}
          playersSelected={playersSelected}
        />
      </section>
      <section className="right-side">
        {children}
      </section>
    </div>
  );
};

export default ShopLayout;
