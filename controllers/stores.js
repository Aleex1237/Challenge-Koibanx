
const storeService = require('../services/stores');
const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');
const logger = require('../utils/logger')

const getAll = async (req,res,next) => {
    try {
        const {limit, skip} = req.query
        const data = await storeService.getAll(limit, skip);
    res.status(statusCode.RESPONSE_OK).json(
    {   
        status: statusCode.RESPONSE_OK,
        msg: messages.RESPONSE_OK,
        data
    }
    );
    } catch (error) {
        next(error);
    }

    
}

const create = async (req, res, next) => {
    try {
        const store = await storeService.create(req.body);

        logger.info("Store created.")
        res.status(statusCode.RESPONSE_OK_CREATED).json({
            status:statusCode.RESPONSE_OK_CREATED,
            msg:messages.RESPONSE_OK_CREATED,
            store
        })
    } catch (error) {
        logger.info("Error to create store")
        next(error);
    }
}

module.exports = { getAll, create };