import React from 'react';

const SearchByAge = ({ generics }) => {
  const ages = generics.age || [];
  return (
    <div className="age-searcher-div">
      <h2>Filtrar jocs per edat</h2>
      <div className="search-buttons">
        {ages.map((age) => {
          return <button className="button-ghost-grey">{age}</button>;
        })}
      </div>
    </div>
  );
};

export default SearchByAge;
