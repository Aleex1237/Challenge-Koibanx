const router = require('express').Router();

const auth = require('../middlewares/auth');
const authController = require('../controllers/auth');

router.post('/', auth.isLogged, authController.login);

module.exports = router;