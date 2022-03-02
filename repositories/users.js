const User = require('../models/user');
require('../app');

const getByEmail = async (email) => {

    const user = await User.find({ username: email });

    return user;
}

module.exports = { getByEmail };