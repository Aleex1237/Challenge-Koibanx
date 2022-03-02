const authService = require('../services/auth');

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const auth = await authService.checkUser(email, password);
        
        req.headers.authorization = `Basic ${auth.token}`

        
    res.status(200).json(
        {
            user: auth.user
        }
    )

    } catch (error) {
        next(error);
    }
    
}

module.exports = { login };