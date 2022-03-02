let bcrypt = require('bcrypt-nodejs');

const usersRepository = require('../repositories/users');

const checkUser = async (email, password) => {

    const user = await usersRepository.getByEmail(email);

    if (!user) {
        return 'invalid credentials';
    }

    const comparedPassword = bcrypt.compareSync(password, user[0].password);

    if (!comparedPassword) {
        return 'invalid credentials'
    }

    if (user[0].email !== email && comparedPassword !== true) {
        return 'invalid credentials'
    }

    const token = Buffer.from(`${user[0].id}:${user[0].password}`).toString('base64');

    return { user, token};
};

module.exports = { checkUser };