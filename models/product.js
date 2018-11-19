const fs = require('fs');
const path = require('path');

const idGenerator = require('../util/unique-id-generator');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = idGenerator();

        return new Promise((resolve, reject) => {
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const products = JSON.parse(fileContent);

                    products.push(this);

                    const productsJson = JSON.stringify(products);
                    fs.writeFile(p, productsJson, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
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
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const products = JSON.parse(fileContent);
                    const product = products.find(product => id === product.id);
                    resolve(product);
                }
            });
        });
    }

    static editProduct(id, product) {
        return new Promise((resolve, reject) => {
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const oldProducts = JSON.parse(fileContent);
                    const products = oldProducts.map(prod => {
                        if (id === prod.id) {
                            return product;
                        } else {
                            return prod;
                        }
                    });

                    const productsJson = JSON.stringify(products);
                    fs.writeFile(p, productsJson, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
};
