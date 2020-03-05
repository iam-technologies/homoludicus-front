import React from 'react';

const ProductListHeader = (props) => {
    const {
        numProducts,
        arrayPages,
        setCurrentPage,
    } = props;

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
                        {arrayPages.map(page => {
                            return <p onClick={() => setCurrentPage(page)}>{`${page} - `}</p>
                        })}
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