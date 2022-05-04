/**
 * Created by Shivram on 01/03/2020.
 * @name Swagger Configuration file
 */
const swaggerTools = require('swagger-tools');
var swaggerJson = require('../public/swagger.json');
swaggerJson = require('../auth/signin/signInSwagger.js')(swaggerJson);

var options = {
    swaggerUi: '/swagger.json',
    controllers: './src'
};

var baseURL = process.env.baseURL.split('://');

swaggerJson.host = baseURL[1];
swaggerJson.info.description = 'HostName / URL : ' + swaggerJson.host;
swaggerJson.schemes[0] = baseURL[0];

logger.info('swagget host addresson', swaggerJson.host);

module.exports = function (app) {

    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(swaggerJson, function (middleware) {
        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use('auth', middleware.swaggerMetadata());

        // Validate Swagger requests
        app.use(middleware.swaggerValidator());

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter(options));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());
    });
};
