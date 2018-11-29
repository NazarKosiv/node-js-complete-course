const ProductCart = require('../models/productCart');

module.exports = class Cart {
    constructor() {
        this.products = [];
        this.price = 0;
    }

    static addProduct(products, productId, price) {
        const productIndex = products.findIndex(product => productId === product.id);
        const newProducts = [...products];

        if (productIndex !== -1) {
            newProducts[productIndex].quantity += 1;
        } else {
            const product = new ProductCart(productId, price);

            newProducts.push(product);
        }

        return newProducts;
    }

    static calculatePrice(products) {
        return products.map(product => product.price * product.quantity)
            .reduce((accumulator, currentValue) => accumulator + currentValue);
    }
};
