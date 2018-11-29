module.exports = class ProductCart {
    constructor(productId) {
        this.productId = productId;
        this.quantity = 1;
    }

    addQuantity(num = 1) {
        this.quantity += num;
    }
};
