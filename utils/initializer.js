const User = require('../models/user')
const Store = require('../models/store')
const logger = require('../utils/logger')

exports.init = async function () {
    if (await User.countDocuments({"username": "test@koibanx.com"})) {
        return
    }

    let user = new User();
    user.username = "test@koibanx.com";
    user.password = "admin";
    await User.create(user);

    logger.info("Test User created")

    if (await Store.countDocuments({'name': 'storeTest'})) {
        return;
    }

    let store = new Store();
    store.name = 'storeTest';
    store.cuit = '9029a9d';
    store.concepts = ['store', 'almacen', 'tienda'];
    store.currentBalance =  10000;
    store.active =  true;
    store.lastSale = Date.now();
    await Store.create(store);

    logger.info("Test Store created")
};
