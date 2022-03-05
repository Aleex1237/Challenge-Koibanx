const User = require('../models/user');


const getByEmail = async (email) => {
    const user = await User.find({ username: email });
    return user;
}

const getById = async (id) => {
    const user = await User.findById(id);
    return user;
}

module.exports = { getByEmail, getById };