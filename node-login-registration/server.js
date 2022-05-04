#!/usr/bin/env node
'use strict';

global.logger = require('./src/util/logger');
const envVariables = require('./env')[process.env.NODE_ENV || 'local'];
// Load env variables
if (!envVariables) {
    throw new Error('Environment not set');
}

for (var key in envVariables) {
    if (envVariables.hasOwnProperty(key)) {
        process.env[key] = envVariables[key];
    }
}

const app = require('./src/app');
const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => {
    logger.info('Server is started with port : %s', port);
});
