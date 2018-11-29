const fs = require('fs');
const path = require('path');

const idGenerator = require('../util/unique-id-generator');
const Cart = require('../models/cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'users.json'
);

module.exports = class User {
    constructor(login, password) {
        this.id = idGenerator();
        this.login = login;
        this.password = password;
        this.expireDate = new Date().getMilliseconds() + 1000 * 60 * 30;

        this.cart = new Cart();
    }

    static authenticate(login, password) {
        return new Promise((resolve, reject) => {
            User.fetchAll()
                .then(users => {
                    const userIndex = users.findIndex(user => login === user.login && password === user.password);

                    if (userIndex !== -1) {
                        users[userIndex].expireDate = new Date().getMilliseconds() + 1000 * 60 * 30;

                        User.saveAll(users)
                            .then(() => {
                                resolve();
                            })
                            .catch(err => {
                                reject(err);
                            });
                    } else {
                        reject();
                    }
                })
                .catch(error => reject(error));
        });
    }

    static keepAlive(users, userIndex) {
        return new Promise((resolve, reject) => {
            users[userIndex].expireDate = new Date().getMilliseconds() + 1000 * 60 * 30;

            User.saveAll(users)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static isAuthenticated(login, password) {
        return new Promise((resolve, reject) => {
            User.fetchAll()
                .then(users => {
                    const userIndex = users.findIndex(user => login === user.login && password === user.password);

                    if (userIndex !== -1) {
                        const expireDate = users[userIndex].expireDate;
                        const now = new Date().getMilliseconds();

                        if (now > expireDate) {
                            resolve(false);
                        } else {
                            User.keepAlive(users, userIndex)
                                .then(() => {
                                    resolve(true);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        }

                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static addToCart(productId) {

    }

    save() {
        return new Promise((resolve, reject) => {
            User.fetchAll()
                .then(users => {
                    const newUsers = [...users, this];

                    User.saveAll(newUsers)
                        .then(() => {
                            resolve(this.id);
                        })
                        .catch(err => {
                            reject(err);
                        });
                });
        });
    }

    static fetchAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, {encoding: 'utf-8'}, (err, fileContent) => {
                if (err) {
                    reject(err);
                } else {
                    const users = JSON.parse(fileContent);

                    resolve(users);
                }
            })
        });
    }

    static saveAll(data) {
        const users = JSON.stringify(data);

        return new Promise((resolve, reject) => {
            fs.writeFile(p, users, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};
