require('dotenv').config();
const express = require('express')
const app = express()

const config = require('config');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const indexRouter = require('./routes');

mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
require('./utils/initializer').init()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', indexRouter);

// Start the server
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error.'
    }
  });
});

module.exports = app
