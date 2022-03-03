const logger = require('../utils/logger');
const router = require('express').Router();

const authHeader = require('../middlewares/auth');

const storeControllers = require('../controllers/stores');

router.get('/', authHeader.auth ,storeControllers.getAll);
  

/* router.route('/stores')
  .get( logger.info("pending validations"), logger.info("pending use case"),  storeControllers.getAll); */

module.exports = router;
