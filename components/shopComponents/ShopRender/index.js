import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import SearchByAge from '../../SearchByAge';
import Carousel from '../../common/Carousel';
import getGeneric from '../../../redux/actions/genericActs';
import ShopLayout from '../ShopLayout';
import ShopList from '../ShopList';
import BonusSection from '../../BonusSection';
import getBrowserUrl from '../../common/helpers';
import { api } from '../../../serverServices';
import ProductListHeader from '../ProductListHeader';
import MobileFilters from '../MobileFilters';

const ShopRender = ({
    content,
    selection,
    categories,
    allProducts,
    asPath,
    category = 'todos',
    newFilters,
    totalPages,
}) => {
    const carouselItems = _get(content, 'slider', []);
    const genericLoad = useSelector(state => state.generic.load);
    const generics = useSelector(state => state.generic.doc);
    const screen = useSelector(state => state.windowResize.screen);
    console.log('shop -> screen', screen);
    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!genericLoad) {
            dispatch(getGeneric());
        }
    }, []);

    // searchBar
    const initialValue = '';
    const [inputValue, setInputValue] = useState(initialValue);

    const [categorySelected, setCategory] = useState(category);
    const [filters, setFilters] = useState(newFilters);

    const [filteredProducts, setProducts] = useState(allProducts);

    const defaultOptions = { limit: 12, skip: 0 };
    const [options, setOptions] = useState(defaultOptions);

    const [filterSelected, setFilterSelected] = useState('');
    const [ageSelected, setAgeSelected] = useState('');
    const [habilitySelected, setHabilitySelected] = useState('');
    const [playersSelected, setPlayersSelected] = useState('');

    //Pagination
    const [page, setPage] = useState(1);

    let arrayPages = [];

    for (var i = 1; i <= totalPages; i++) {
        arrayPages.push(i)
    }

    async function getData() {
        const newData =
            await api.products.getByCategory(category, { options, filters }, (err, res) => {
                return res ? res.data : null;
            });
        setProducts(newData)
    }

    async function getSearch() {
        const search = inputValue;

        const newData = await api.products.getBySearch({ options, search }, (err, res) => {
            return res ? res.data : null;
        });
        setProducts(newData)
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        getSearch()
    };

    const newUrl = getBrowserUrl(categorySelected, filters);

    useEffect(() => {
        router.push('/shop/[category]', newUrl);
    }, [newUrl]);

    const onSetCategory = (newCategory) => {
        setCategory(newCategory);
    };

    const onSetAge = (newAge) => {
        setAgeSelected(newAge)
        const ageQuery = newAge.replace('+', 'mas');
        setFilters({ age: ageQuery });
    };

    const onSetHability = (newHability) => {
        setHabilitySelected(newHability)
        setFilters({ ...filters, productTags: newHability });
    };

    const onSetPlayers = (numPlayers) => {
        setPlayersSelected(numPlayers)
        setFilters({ ...filters, players: numPlayers });
    };

    const onDeleteFilter = (filter) => {
        if (filter === 'age') {
            delete filters.age;
            setAgeSelected('todos')
        } else if (filter === 'hability') {
            delete filters.productTags;
            setHabilitySelected('todos')
        } else if (filter === 'players') {
            delete filters.players;
            setPlayersSelected('todos')
        }
        getData()
    };

    const setCurrentPage = (newPage) => {
        if (newPage == 1) {
            setOptions({ ...options, skip: 0 })
        } else {
            const newSkip = (newPage - 1) * 12;
            setOptions({ ...options, skip: newSkip });
        }
        setPage(newPage)
    }

    useEffect(() => {
        getData();
    }, [options, category, filters]);

    const numProducts = _get(filteredProducts, 'numProducts', '')
    const productList = _get(filteredProducts, 'products', '')
    const productList1 = productList.slice(0, 6)
    const productList2 = productList.slice(6, 13)
    const productList1Mobile = productList.slice(0, 4)
    const productList2Mobile = productList.slice(4, 8)
    const productList3Mobile = productList.slice(8, productList.length + 1)
    console.log("products", productList3Mobile.length + productList1Mobile.length + productList2Mobile.length)
    console.log('filtered', filteredProducts.products.length)
    console.log('all', allProducts.products)

    //MOBILE
    const onDeleteAllFilters = () => {
        delete filters.age;
        delete filters.productTags;
        delete filters.players;
        setCategory('todos')
    }

    const [filtersMenuState, setFiltersMenuState] = useState(false);
    const menuState = filtersMenuState ? '-open' : '';
    const [buttonState, setButtonState] = useState('');
    const [list3state, setList3State] = useState('-hidden');

    const seeAllFunction = () => {
        setProducts(allProducts);
        setButtonState('-hidden');
        onDeleteAllFilters();
        setList3State('');
        setButtonState('');
    }

    const handleFiltersMenuState = (state) => {
        setFiltersMenuState(!state);
        setList3State('-hidden');
        setButtonState('');
    }

    if (screen === 'lg') {
        return (
            <>
                <Carousel items={carouselItems} />
                <SearchByAge
                    generics={generics}
                    onSetAge={onSetAge}
                    ageSelected={ageSelected}
                    onDeleteFilter={onDeleteFilter}
                />
                <ShopLayout
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    categories={categories}
                    onSetCategory={onSetCategory}
                    categorySelected={categorySelected}
                    generics={generics}
                    onSetHability={onSetHability}
                    onSetAge={onSetAge}
                    ageSelected={ageSelected}
                    onSetPlayers={onSetPlayers}
                    onDeleteFilter={onDeleteFilter}
                    filterSelected={filterSelected}
                    setFilterSelected={setFilterSelected}
                    habilitySelected={habilitySelected}
                    playersSelected={playersSelected}
                >
                    <ProductListHeader
                        numProducts={numProducts}
                        arrayPages={arrayPages}
                        setCurrentPage={setCurrentPage}
                        page={page}
                    />
                    <ShopList products={productList1} />
                    <div className="bonus-section">
                        <BonusSection />
                    </div>
                    <ShopList products={productList2} />
                </ShopLayout>
            </>
        );
    } else {
        return (
            <>
                <Carousel items={carouselItems} />
                <div className="filter-menu-div">
                    <div
                        className="icon-div"
                        onClick={() => handleFiltersMenuState(filtersMenuState)}
                    >
                        <img
                            src="/icon/icon-filter-white.svg"
                            alt="icon-filter"
                        />
                    </div>
                </div>
                <div className={`dropdown-filters${menuState}`}>
                    <MobileFilters
                        handleInputChange={handleInputChange}
                        inputValue={inputValue}
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
                        onDeleteAllFilters={onDeleteAllFilters}
                        setFiltersMenuState={setFiltersMenuState}
                    />
                </div>
                <div className={`shop-mobile-div${menuState}`}>
                    <div className="mobile-results">
                        <p>Resultats:</p>
                        <p className="numProducts-p">{numProducts}</p>
                    </div>
                    <ShopList products={productList1Mobile} />
                    <div className="bonus-section">
                        <BonusSection />
                    </div>
                    <ShopList products={productList2Mobile} />
                    <div
                        className={`see-all-button-div${buttonState}`}
                        onClick={() => seeAllFunction()}
                    >
                        <button className="button-yellow">
                            Veure tots
                        </button>
                    </div>
                    <div className={`list3-div${list3state}`}>
                        <ShopList products={productList3Mobile} />
                    </div>
                </div>
            </>
        )
    }

};

export default ShopRender;