require('../app');
const Store = require('../models/store');




const getAll = async () => {
    const notes = await Store.find();

    return notes
}

module.exports = { getAll };