const authService = require('../services/auth');
const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            const error = new Error(messages.NO_TOKEN);
            error.status = statusCode.FORBIDDEN;
            throw error;
        }
        const token = req.headers.authorization.split(' ')[1];
    
        const dataDecoded = Buffer.from(token, 'base64').toString().split(':');
    
        const user = await authService.getUserById(dataDecoded[0]);
    
        if (!user) {
            const error = new Error(messages.INVALID_TOKEN);
            error.status = statusCode.FORBIDDEN;
            return next(error);
        }
    
         next();
    } catch (error) {
        next(error);
    }

}

module.exports = { auth };