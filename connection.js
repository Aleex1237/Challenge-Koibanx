const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


const connection = () => {
    mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = { connection };
