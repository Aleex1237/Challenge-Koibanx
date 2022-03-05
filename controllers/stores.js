const storeService = require('../services/stores');
const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');

const getAll = async (req, res, next) => {
    try {
        const { limit, page } = req.query
        const data = await storeService.getAll(limit, page);

        res.status(statusCode.RESPONSE_OK).json(data);
    } catch (error) {
        next(error);
    }


}

const create = async (req, res, next) => {
    try {
        const store = await storeService.create(req.body);

        res.status(statusCode.RESPONSE_OK_CREATED).json({
            status: statusCode.RESPONSE_OK_CREATED,
            msg: messages.RESPONSE_OK_CREATED,
            store
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { getAll, create };