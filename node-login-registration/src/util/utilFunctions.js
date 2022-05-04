const HTTPStatus = require('../util/http-status');
const User = require('../auth/user.model');
/**
 * This class reprasents common utilities for application
 */
class Utils {

    static errorResponse () {
        return JSON.parse(JSON.stringify({
            status: 0,
            data: {},
            message: ''
        }));
    }
    
    static successResponse () {
        return JSON.parse(JSON.stringify({
            status: 1,
            data: {},
            message: ''
        }));
    }

    static exceptionResponse (res) {
        return JSON.parse(JSON.stringify({
            status: 0,
            message: res.__('ERROR_MSG')
        }));
    }

    /**
     * This function is being used to format response object
     * @auther Shivram
     * @param {string} error Error Message
     * @param {Object} data Object to send in response
     * @param {Object} res Response Object
     * @param {string} successMessage success message
     * @param {Object} additionalData additional data outside of data object in response
     * @since 01/03/2020
     */
    static sendResponse (error, data, res, successMessage, additionalData, successMessageVars) {
        var responseObject;
        var status;
        if (error) {
            responseObject = Utils.errorResponse();
            if (typeof error === 'object') {
                responseObject.message = error[0];
                status = error[1];
            } else {
                responseObject.message = error;
                status = HTTPStatus.BAD_REQUEST;
            }
            return res.status(status).send(responseObject);
        } else {
            responseObject = Utils.successResponse();
            responseObject.message = successMessageVars ?
                res.__.apply('', [successMessage].concat(successMessageVars)) : res.__(successMessage);
            responseObject.data = data;
            if (additionalData) {
                for (var param in additionalData) {
                    if (additionalData.hasOwnProperty(param))
                        responseObject[param] = additionalData[param];
                }
            }
            return res.status(HTTPStatus.OK).send(responseObject);
        }
    }
}

module.exports = Utils;
