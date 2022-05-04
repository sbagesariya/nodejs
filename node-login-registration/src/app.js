/**
 * @name Server Configuration
 */

const express = require('express');
const app = express();
const auth = require('./auth/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const i18n = require('i18n');

// const mongodbUrl = 'mongodb://' + process.env.DB_User + ':' + process.env.DB_Pass + '@' +
// process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + config.DB_NAME;
const mongodbUrl = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;

const dbOptions = {
    useNewUrlParser: true,
    keepAlive: true,
    autoIndex: false,
    reconnectTries: 500,
    reconnectInterval: 500,
    poolSize: 20,
    bufferMaxEntries: 0,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
};

// Events on db connection
mongoose.connection.on('error', function (err) {
    Logger.error('MongoDB connection error. Please make sure MongoDB is running. -> ' + err);
});

mongoose.connection.on('disconnected', function () {
    Logger.error('MongoDB connection disconnected.', new Date());
});

mongoose.connection.on('reconnected', function () {
    Logger.error('MongoDB connection reconnected.');
});

mongoose.connect(mongodbUrl, dbOptions);
// mongoose.connect('mongodb://localhost:27017/practical_test', dbOptions);

// Configure i18n for multilingual
i18n.configure({
    locales: ['en', 'de'],
    directory: __dirname + '/locales',
    extension: '.json',
    prefix: '',
    logDebugFn: function (msg) {
        if (process.env.localdb === 'true') {
            logger.debug('i18n::debug', msg);
        }
    }
});

app.use(i18n.init);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());
app.use('/user', auth);
app.use(require('./middleware/exceptionHandler'));

module.exports = app;
