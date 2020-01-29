import React from 'react';

const SearchByAge = ({ products }) => {
  const ages = products.age
  // ['0 - 12 Mesos', '12 - 24 Mesos', '3 + Anys', '4 - 7 Anys', '7 - 12 Anys', '12 + Anys'];
  console.log(products)
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
