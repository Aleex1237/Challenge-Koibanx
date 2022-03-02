const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();

const storeControllers = require('../controllers/stores');

router.route('/stores')
  .get(/* logger.info("pending validations"), logger.info("pending use case"),  */storeControllers.getAll);

module.exports = router;
