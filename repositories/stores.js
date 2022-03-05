const Store = require('../models/store');




const getAll = async (limit, skip) => {
    const notes = await Store.find().limit(limit).skip(skip);

    return notes
}

const getCount = async () => {
    const count = await Store.find().countDocuments();

    return count
}

const create = async (data) => {
    const { name, cuit, currentBalance, lastSale, concepts } = data;

    const note = await Store.create({
        name,
        cuit,
        currentBalance,
        active: true,
        lastSale,
        concepts,
    })

    return note;
}

module.exports = { getAll, create, getCount };