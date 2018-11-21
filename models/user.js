const fs = require('fs');
const path = require('path');

const idGenerator = require('../util/unique-id-generator');

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
        this.authenticated = false;

        this.orders = [];
        this.cart = [];
    }

    save() {
        return new Promise((resolve, reject) => {
            User.fetchAll()
                .then(users => {
                    const newUsers = [...users, this];

                    User.saveAll(newUsers)
                        .then(() => {
                            resolve();
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
        const users = JSON.parse(data);

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
