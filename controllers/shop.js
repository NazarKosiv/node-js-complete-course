const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                products,
                pageTitle: 'All Products',
                path: '/products'
            });
        });
};

exports.getProduct = (req, res, next) => {
    const id = req.params.id;

    Product.fetchProduct(id)
        .then(product => {
            res.render('shop/product-detail', {
                product,
                pageTitle: 'Product Detail'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                products,
                pageTitle: 'Shop',
                path: '/'
            });
        });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    });
};
