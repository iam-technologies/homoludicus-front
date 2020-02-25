import React from 'react';
import SearchBar from '../../SearchBar';

const CategoryFilter = (props) => {
  const { inputValue, handleInputChange, categories, onSetCategory } = props;
  // console.log(categories)

  return (
    <>
      <SearchBar inputValue={inputValue} handleInputChange={handleInputChange} />

      <div className="categories-div">
        <h5>Filtrar per categoria</h5>
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Totes"
            onClick={() => onSetCategory('todos')}
          />
          <label className="all-label" htmlFor="Totes">
            Totes
          </label>
        </div>
        {categories.map((category, i) => {
          return (
            <>
              <div className="category-div">
                <input
                  type="checkbox"
                  className="category-in"
                  id={category.name.es}
                  onClick={() => onSetCategory(category.url.es)}
                />
                <label className="tab-label" htmlFor={category.name.es}>
                  {category.name.es}
                </label>
                <div className="tab-content">
                  {category.childrens.map((child) => {
                    return <p onClick={() => onSetCategory(child.url.es)} >{child.name.es}</p>;
                  })}
                </div>
              </div>
            </>
          );
        })}
        {/* Tendrán otras llamadas, diferentes a la de category */}
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Habilidad"
          />
          <label className="tab-label" htmlFor="Habilidad">
            Habilidad
          </label>
        </div>
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Edad"
          />
          <label className="tab-label" htmlFor="Edad">
            Edad
          </label>
        </div>
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Jugadores"
          />
          <label className="tab-label" htmlFor="Jugadores">
            Número de jugadores
          </label>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
