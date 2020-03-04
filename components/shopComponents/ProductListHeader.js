import React from 'react';

const ProductListHeader = (props) => {
    const { numProducts } = props;

    return (
        <>
            <div className="product-list-header">
                <div className="order">
                    <p>Ordenar per</p>
                </div>
                <div className="results">
                    <p>Resultats:</p>
                    <p className="num-results">
                        {numProducts}
                    </p>
                </div>
                <div className="pagination-div">
                    <button className='pagination-arrow'>
                        <img src="/icon/left.svg" />
                    </button>
                    <div className="page-numbers-div">
                        <p>1 - 2 - 3 - 4</p>
                    </div>
                    <button className='pagination-arrow'>
                        <img src="/icon/right.svg" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductListHeader;