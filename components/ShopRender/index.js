import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import SearchByAge from '../../components/SearchByAge';
import Carousel from '../../components/common/Carousel';
import getGeneric from '../../redux/actions/genericActs';
import ShopLayout from '../../components/common/ShopLayout';
import ShopList from '../../components/ShopList';
import BonusSection from '../../components/BonusSection';
import getBrowserUrl from '../../components/common/helpers';
import { api } from '../../serverServices';

const ShopRender = ({
    content,
    selection,
    categories,
    allProducts,
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

    const defaultOptions = { limit: 12, skip: 0 };
    const [options, setOptions] = useState(defaultOptions);

    const [filterSelected, setFilterSelected] = useState('');
    const [ageSelected, setAgeSelected] = useState('');
    const [habilitySelected, setHabilitySelected] = useState('');
    const [playersSelected, setPlayersSelected] = useState('');

    // const [page, setPage] = useState(1);
    console.log(inputValue)

    async function getData() {
        const search = inputValue;
        const newData =
            await api.products.getByCategory(category, { options, filters }, (err, res) => {
                console.log(res.data)
                return res ? res.data : null;
            });
        setProducts(newData);
    }

    async function getSearch() {
        const search = inputValue;
        console.log("getSearch -> search", search.lenght)

        const newData = await api.products.getBySearch({ options, search }, (err, res) => {
            return res ? res.data : null;
        });
        console.log('newData', newData)
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

    useEffect(() => {
        getData()
    }, [category, options, filters, inputValue]);

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
        getData();
    };

    const onDeleteAge = () => {
        onDeleteFilter('age');
        setAgeSelected('todos')
    }

    const productList = filteredProducts.products;
    const numProducts = filteredProducts.numProducts;
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
                <ShopList
                    products={productList}
                    numProducts={numProducts}
                />
                <BonusSection />
            </ShopLayout>
        </>
    );
};

export default ShopRender;