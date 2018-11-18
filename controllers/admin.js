const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);

    product.save()
        .then(() => {
            res.redirect('/');
        });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        });
};

exports.getEditProduct = (req, res, next) => {
    const index = +req.params.id;

    Product.fetchProduct(index)
        .then(product => {
            res.render('admin/edit-product', {
                product,
                index,
                pageTitle: 'Edit Product',
                path: '/admin/edit-product'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const index = +req.params.id;
    const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);

    Product.editProduct(index, product)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};
