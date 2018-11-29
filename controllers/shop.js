const Product = require('../models/product');
const User = require('../models/user');

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

exports.login = (req, res) => {
    res.render('shop/login', {
        path: '/login',
        pageTitle: 'Login',
        type: 'login'
    });
};

exports.register = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    const user = new User(login, password);
    user.save()
        .then(userId => {
            res.redirect(`/?id=${userId}`);
        });
};

exports.getLoginPage = (req, res) => {
    res.render('shop/login', {
        path: '/login',
        pageTitle: 'Login',
        type: 'login'
    });
};

exports.getRegisterPage = (req, res) => {
    res.render('shop/login', {
        path: '/register',
        pageTitle: 'Register',
        type: 'register'
    });
};
