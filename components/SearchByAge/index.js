import React from 'react';

// agregar category age "totes"
// arreglar hacer la búsqueda con filtro category "todos"
const SearchByAge = ({ generics, onSetAge, onDeleteFilter }) => {
  const ages = generics.age || [];
  return (
    <div className="age-searcher-div">
      <h2>Filtrar jocs per edat</h2>
      <div className="search-buttons">
        {ages.map((age) => {
          return (
            <button
              className="button-ghost-grey"
              onClick={() => onSetAge(age)}
            >
              {age}
            </button>
          );
        })}
        <button
          className="button-ghost-grey"
          onClick={() => onDeleteFilter('age')}
        >
          Totes
        </button>
      </div>
    </div>
  );
};

export default SearchByAge;
