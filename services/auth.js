const bcrypt = require('bcrypt-nodejs');
const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');

const usersRepository = require('../repositories/users');

const checkUser = async (email, password) => {
    
    const user = await usersRepository.getByEmail(email);
    if (user.length === 0) {
        const error = new Error(messages.EMAIL_NOT_FOUND);
        error.status = statusCode.NO_USER_CREDENTIALS;
        throw error;
    }

    const comparedPassword = bcrypt.compareSync(password, user[0].password);

    if (comparedPassword !== true) {
        const error = new Error(messages.NO_MATCH_USER);
        error.status = statusCode.NO_USER_CREDENTIALS;
        throw error;
    }

    const token = Buffer.from(`${user[0].id}:${password}`).toString('base64');

    return { user, token};
};

const getUserById = async (id) => {
    const user = usersRepository.getById(id);

    return user;
}

module.exports = { checkUser, getUserById };