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

const ShopRender = ({
    content,
    selection,
    categories,
    allProducts,
    asPath,
    category = 'todos',
    newFilters,
    totalPages
}) => {

    const carouselItems = _get(content, 'slider', []);
    const genericLoad = useSelector(state => state.generic.load);
    const generics = useSelector(state => state.generic.doc);

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
    // console.log("filteredProducts", filteredProducts)

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
    };

    const onDeleteAge = () => {
        onDeleteFilter('age');
        setAgeSelected('todos')
        getData();
    }

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

    const numProducts = filteredProducts.numProducts;
    const productList = filteredProducts.products;
    const productList1 = productList.slice(0, 6)
    const productList2 = productList.slice(6, 13)

    return (
        <>
            <Carousel items={carouselItems} />
            <SearchByAge
                generics={generics}
                onSetAge={onSetAge}
                ageSelected={ageSelected}
                onDeleteAge={onDeleteAge}
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
};

export default ShopRender;