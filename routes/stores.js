const router = require('express').Router();

const authHeader = require('../middlewares/auth');
const storeValidator = require('../validations/store');
const storeControllers = require('../controllers/stores');

router.get('/', authHeader.auth, storeControllers.getAll);

router.post('/', storeValidator.checkBody, authHeader.auth, storeControllers.create);

module.exports = router;
