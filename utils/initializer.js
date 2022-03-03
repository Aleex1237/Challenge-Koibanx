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

    if (await Store.countDocuments() > 5) {
        return;
    }
    const stores = [
        {
        name : 'storeTest1',
        cuit : '20951402',
        concepts : ['store', 'almacen', 'tienda'],
        currentBalance :  2000,
        active :  true,
        lastSale : Date.now()
    },
    {
        name : 'storeTest2',
        cuit : '20951445',
        concepts : ['store', 'almacen', 'tienda'],
        currentBalance :  20000,
        active :  true,
        lastSale : Date.now()
    },
    {
        name : 'storeTest3',
        cuit : '20951450',
        concepts : ['store', 'almacen', 'tienda'],
        currentBalance :  5000,
        active :  true,
        lastSale : Date.now()
    },
    {
        name : 'storeTest4',
        cuit : '20951124',
        concepts : ['store', 'almacen', 'tienda'],
        currentBalance :  300,
        active :  true,
        lastSale : Date.now()
    },
    {
        name : 'storeTest5',
        cuit : '20951423',
        concepts : ['store', 'almacen', 'tienda'],
        currentBalance :  250,
        active :  true,
        lastSale : Date.now()
    },
    ]
    
    await Store.insertMany(stores)
    logger.info("Test Stores created")
};
