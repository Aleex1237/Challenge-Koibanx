const authService = require('../services/auth');
const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const auth = await authService.checkUser(email, password);
        
        res.status(statusCode.RESPONSE_OK).json({
                msg:messages.RESPONSE_OK, 
                user: `Basic ${auth.token}`
            });

    } catch (error) {
        next(error);
    }
    
}

module.exports = { login };