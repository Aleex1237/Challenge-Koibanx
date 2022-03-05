require('dotenv').config();
const express = require('express')
const app = express()

//Modules
const logger = require('./utils/logger');
const morgan = require('morgan');
const config = require('config');
const db = require('./connection');

db.connection();

//Initializer
require('./utils/initializer').init()

//Routes
const indexRouter = require('./routes');

//Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Router Handler
app.use('/api', indexRouter);

// Start the server
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));


//Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error.'
    }
  });
});

module.exports = app
