import React from 'react';
import SearchBar from '../../SearchBar';

const CategoryFilter = ({ inputValue, handleInputChange }) => {
  return (
    <>
      <SearchBar inputValue={inputValue} handleInputChange={handleInputChange} />
      <p>Filtrar per categoria</p>
    </>
  );
};

export default CategoryFilter;

