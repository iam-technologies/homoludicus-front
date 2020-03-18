import React from 'react';
import _get from 'lodash/get';
import CategoryFilter from '../CategoryFilter';

const MobileFilters = ({
    inputValue,
    handleInputChange,
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
    playersSelected,
    onDeleteAllFilters,
    setFiltersMenuState
}) => {

    return (
        <>
            <CategoryFilter
                handleInputChange={handleInputChange}
                inputValue={inputValue}
                children={inputValue}
                categories={categories}
                categorySelected={categorySelected}
                onSetCategory={onSetCategory}
                generics={generics}
                onSetHability={onSetHability}
                onSetAge={onSetAge}
                onSetPlayers={onSetPlayers}
                onDeleteFilter={onDeleteFilter}
                category={category}
                filterSelected={filterSelected}
                setFilterSelected={setFilterSelected}
                ageSelected={ageSelected}
                habilitySelected={habilitySelected}
                playersSelected={playersSelected}
            />
            <div className="delete-search-buttons">
                <button
                    className="button-yellow"
                    onClick={() => onDeleteAllFilters()}
                >
                    Eliminar filtros
                </button>
                <button
                    className="button-yellow"
                    onClick={() => setFiltersMenuState(false)}
                >
                    Buscar
                </button>
            </div>
        </>
    );
};

export default MobileFilters;
