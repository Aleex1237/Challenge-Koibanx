const router = require('express').Router();

const authController = require('../controllers/auth');
const authValidator = require('../validations/auth');

router.post('/', authValidator.checkBody ,authController.login);

module.exports = router;