/**
 * Created by Shivram on 01/03/2020.
 * @name Exception Handler Middleware
 */
const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');
module.exports = function (err, req, res, next) {
    var errResponse;
    if (next) {
        errResponse = Utils.exceptionResponse(res);
        logger.error(req.url, err);
        if (process.env.logLevel === 'debug') {
            errResponse.stackTrace = err;
        }
    } else {
        res = req;
        errResponse = Utils.exceptionResponse(res);
    }
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(errResponse);
};
