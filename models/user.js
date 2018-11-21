const fs = require('fs');
const path = require('path');

const idGenerator = require('../util/unique-id-generator');

const mainModulePath = path.dirname(process.mainModule.filename);

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

    }
};
