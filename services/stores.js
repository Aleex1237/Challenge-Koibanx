const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');
const storeDecorator = require('./decorators');
const storeRepository = require('../repositories/stores');
const getAll = async (limit = 10, page) => {
    const skip = (page - 1) * limit;

    const data = await storeDecorator.getAllDecorated(limit, skip);
    const total = await storeRepository.getCount();

    if (!data || !total) {
        const error = new Error(messages.INTERNAL_ERROR);
        error.status = statusCode.INTERNAL_ERROR;
        throw error;
    }

    return {
        data,
        page: +page,
        pages: Math.ceil(total / limit),
        limit: +limit,
        total
    };
}

const create = async (data) => {

    const store = await storeDecorator.createDecorated(data);

    if (!store) {
        const error = new Error(messages.INTERNAL_ERROR);
        error.status = statusCode.INTERNAL_ERROR;
        throw error;
    }

    return store;
}

module.exports = { getAll, create };