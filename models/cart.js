const ProductCart = require('../models/productCart');

module.exports = class Cart {
    constructor() {
        this.products = [];
        this.price = 0;
    }

    addProduct(productId) {
        const productIndex = this.products.findIndex(product => productId === product.id);

        if (productIndex !== -1) {
            this.products[productIndex].addQuantity();
        } else {
            const product = new ProductCart(productId);

            this.products.push(product);
        }
    }

    fetchCart() {

    }
};
