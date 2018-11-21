const fs = require('fs');
const path = require('path');

const idGenerator = require('../util/unique-id-generator');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

module.exports = class Product {
    constructor(title, imageUrl, description, price, id = null) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id;
    }

    save() {
        this.id = idGenerator();

        return new Promise((resolve, reject) => {
            Product.fetchAll()
                .then(products => {
                    products.push(this);

                    const productsJson = JSON.stringify(products);
                    fs.writeFile(p, productsJson, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static fetchAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const products = JSON.parse(fileContent);

                    resolve(products);
                }
            });
        });
    }

    static fetchProduct(id) {
        return new Promise((resolve, reject) => {
            Product.fetchAll()
                .then(products => {
                    const product = products.find(product => id === product.id);

                    resolve(product);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static editProduct(product) {
        return new Promise((resolve, reject) => {
            Product.fetchAll()
                .then(products => {
                    const editedProducts = products.map(prod => {
                        if (product.id === prod.id) {
                            return product;
                        } else {
                            return prod;
                        }
                    });

                    const productsJson = JSON.stringify(editedProducts);
                    fs.writeFile(p, productsJson, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};
