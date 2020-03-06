import _get from 'lodash/get';


const formatCartItems = (oldProducts) => {
    const newProducts = [];

    oldProducts.forEach((oldProd) => {
        const index = newProducts.findIndex((newProd) => {
            const oldId = _get(oldProd, 'product._id');
            const currentId = _get(newProd, 'product._id');
            return oldId === currentId;
        });
        if (index === -1) {
            const newItem = { ...oldProd, count: 1 };
            newProducts.push(newItem);
        } else {
            const { count = 1 } = newProducts[index];
            const newItem = { ...newProducts[index], count: count + 1 };
            newProducts[index] = newItem;
        }
    });

    return newProducts;
};

export default formatCartItems;