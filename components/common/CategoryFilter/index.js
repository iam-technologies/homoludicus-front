import React from 'react';
import SearchBar from '../../SearchBar';

const CategoryFilter = (props) => {
  const {
    inputValue,
    handleInputChange,
    categories,
    onSetCategory,
    generics,
    onSetHability,
    onSetAge,
    onSetPlayers,
    onDeleteFilter,
    categorySelected,
    filterSelected,
    setFilterSelected,
  } = props;

  const hability = generics.productTags || [];
  const ages = generics.age || [];
  const players = generics.players || [];

  const allSelected = categorySelected === 'todos' ? '-selected' : '';

  const selectedFilter = (filter) => {
    const selected = filter === filterSelected ? '-selected' : '';
    return selected;
  }

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
          <label className={`all-label${allSelected}`} htmlFor="Totes">
            Totes
          </label>
        </div>
        {categories.map((category, i) => {
          const selected = category.url.es === categorySelected ? '-selected' : '';
          return (
            <>
              <div className="category-div">
                <input
                  type="checkbox"
                  className="category-in"
                  id={category.name.es}
                  onClick={() => onSetCategory(category.url.es)}
                />
                <label className={`tab-label${selected}`} htmlFor={category.name.es}>
                  {category.name.es}
                </label>
                <div className="tab-content">
                  {category.childrens.map((child) => {
                    const selected = child.url.es === categorySelected ? 'selected' : '';
                    return <p className={`${selected}`} onClick={() => onSetCategory(child.url.es)} >{child.name.es}</p>;
                  })}
                </div>
              </div>
            </>
          );
        })}
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Habilidad"
            onClick={() => setFilterSelected('Habilidad')}
          />
          <label className={`tab-label${selectedFilter('Habilidad')}`} htmlFor="Habilidad">
            Habilidad
          </label>
          <div className="tab-content" >
            {hability.map((hab) => {
              return <p onClick={() => onSetHability(hab)} >{hab}</p>;
            })}
            <p onClick={() => onDeleteFilter('hability')} >Totes</p>
          </div>
        </div>
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Edad"
            onClick={() => setFilterSelected('Edad')}
          />
          <label className={`tab-label${selectedFilter('Edad')}`} htmlFor="Edad">
            Edad
          </label>
          <div className="tab-content">
            {ages.map((age) => {
              return <p onClick={() => onSetAge(age)} >{age}</p>;
            })}
            <p onClick={() => onDeleteFilter('age')} >Totes</p>
          </div>
        </div>
        <div className="category-div">
          <input
            type="checkbox"
            className="category-in"
            id="Jugadores"
            onClick={() => setFilterSelected('Players')}
          />
          <label className={`tab-label${selectedFilter('Players')}`} htmlFor="Jugadores">
            Número de jugadores
          </label>
          <div className="tab-content">
            {players.map((player) => {
              return <p onClick={() => onSetPlayers(player)} >{player}</p>;
            })}
            <p onClick={() => onDeleteFilter('players')} >Tots</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
