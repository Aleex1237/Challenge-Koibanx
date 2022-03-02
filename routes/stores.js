const logger = require('../utils/logger');
const router = require('express').Router();

const authHeader = require('../middlewares/auth');

const storeControllers = require('../controllers/stores');

router.route('/stores')
  .get(/* logger.info("pending validations"), logger.info("pending use case"),  */authHeader.auth,storeControllers.getAll);

module.exports = router;
