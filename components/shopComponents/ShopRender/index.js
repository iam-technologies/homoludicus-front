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
    allProducts2,
    asPath,
    category = 'todos',
    newFilters
}) => {

    const carouselItems = _get(content, 'slider', []);
    const genericLoad = useSelector(state => state.generic.load);
    const generics = useSelector(state => state.generic.doc);

    const router = useRouter();

    const dispatch = useDispatch();

    // console.log('asPath', asPath);

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
    console.log("filteredProducts", filteredProducts)
    const [filteredProducts2, setProducts2] = useState(allProducts2);
    // console.log("filteredProducts2", filteredProducts2)

    const defaultOptions = { limit: 6, skip: 0 };
    const [options, setOptions] = useState(defaultOptions);
    const defaultOptions2 = { limit: 6, skip: 6 };
    const [options2, setOptions2] = useState(defaultOptions2)

    const [filterSelected, setFilterSelected] = useState('');
    const [ageSelected, setAgeSelected] = useState('');
    const [habilitySelected, setHabilitySelected] = useState('');
    const [playersSelected, setPlayersSelected] = useState('');

    const [page, setPage] = useState(1);
    console.log('page', page)

    async function getData() {
        const newData =
            await api.products.getByCategory(category, { options, filters }, (err, res) => {
                console.log(res.data)
                return res ? res.data : null;
            });
        const newData2 =
            await api.products.getByCategory(category, { options2, filters }, (err, res) => {
                console.log(res.data)
                return res ? res.data : null;
            });
        setProducts(newData)
        setProducts2(newData2)
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

    useEffect(() => {
        setCategory(category);
    }, [category]);

    const newUrl = getBrowserUrl(categorySelected, filters);

    useEffect(() => {
        router.push('/shop/[category]', newUrl);
    }, [newUrl]);

    // useEffect(() => {
    //     getData()
    // }, [category, options, filters, inputValue]);

    const onSetCategory = (newCategory) => {
        setCategory(newCategory);
        getData();
    };

    const onSetAge = (newAge) => {
        setAgeSelected(newAge)
        const ageQuery = newAge.replace('+', 'mas');
        setFilters({ age: ageQuery });
        getData();
    };

    const onSetHability = (newHability) => {
        setHabilitySelected(newHability)
        setFilters({ ...filters, productTags: newHability });
        getData();
    };

    const onSetPlayers = (numPlayers) => {
        setPlayersSelected(numPlayers)
        setFilters({ ...filters, players: numPlayers });
        getData();
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
        getData();
    };

    const onDeleteAge = () => {
        onDeleteFilter('age');
        setAgeSelected('todos')
        getData();
    }

    const productList = filteredProducts.products;
    const numProducts = filteredProducts.numProducts;
    const productList2 = filteredProducts2.products;

    console.log(productList.length)
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
                <ProductListHeader numProducts={numProducts} />
                <ShopList products={productList} />
                <div className="bonus-section">
                    <BonusSection />
                </div>
                <ShopList products={productList2} />
            </ShopLayout>
        </>
    );
};

export default ShopRender;