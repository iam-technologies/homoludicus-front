import React, { useState } from 'react';

const ProductListHeader = (props) => {
    const {
        numProducts,
        arrayPages,
        setCurrentPage,
        page
    } = props;

    const [translate, setTranslate] = useState(0);
    const [countPages, setCountPages] = useState(1);
    const length = Math.ceil(arrayPages.length / 4);

    const translateRight = () => {
        if (length > countPages) {
            setTranslate(translate - 80)
            setCountPages(countPages + 1)
        }
    }

    const translateLeft = () => {
        if (countPages > 1) {
            setTranslate(translate + 80)
            setCountPages(countPages - 1)
        }
    }

    const divStyle = {
        transform: `translate(${translate}px)`
    }

    return (
        <div className="product-list-header">
            <div className="order">
                <p>Ordenar per</p>
            </div>
            <div className="results">
                <p>Resultats:</p>
                <p className="num-results">
                    {numProducts} articles
                </p>
            </div>
            <div className="pagination-div">
                <button className='pagination-arrow' onClick={() => translateLeft()} >
                    <img src="/icon/left.svg" />
                </button>
                <div className="page-numbers-cont">
                    <div className="page-numbers-div" style={divStyle}>
                        {arrayPages.map(pg => {
                            const selected = page === pg ? 'selected' : '';
                            return <p key={pg} className={`page-number ${selected}`} onClick={() => setCurrentPage(pg)}>{`${pg} - `}</p>
                        })}
                    </div>
                </div>
                <button className='pagination-arrow' onClick={() => translateRight()} >
                    <img src="/icon/right.svg" />
                </button>
            </div>
        </div>
    );
};

export default ProductListHeader;