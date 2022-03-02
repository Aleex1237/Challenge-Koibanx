const router = require('express').Router();

const authRouter = require('./auth');
const storesRouter = require('./stores');

router.use('/auth', authRouter);

router.use('/stores', storesRouter);

module.exports = router;