const fs = require('fs');
const path = require('path');

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

    static fetchProduct(index) {
        return new Promise((resolve, reject) => {
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const products = JSON.parse(fileContent);
                    const product = products[index];
                    resolve(product);
                }
            });
        });
    }

    static editProduct(index, product) {
        return new Promise((resolve, reject) => {
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const products = JSON.parse(fileContent);
                    products[index] = product;

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
