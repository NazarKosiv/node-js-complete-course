module.exports = class ProductCart {
    constructor(productId, price) {
        this.productId = productId;
        this.price = price;
        this.quantity = 1;
    }
};
