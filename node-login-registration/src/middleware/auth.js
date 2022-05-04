/**
 * Created by Shivram on 01/03/2020.
 * @name AuthMiddleWare
 */

const jwt = require('jsonwebtoken');
const Utils = require( '../util/utilFunctions');
const HTTPStatus = require('../util/http-status');

/**
* @desc This function is being used to authenticate each private request
* @author Shivram
* @since 01/03/2020
* @param {Object} req Request
* @param {Object} req.headers RequestBody
* @param {Object} req.headers.accessToken accessToken
* @param {Object} res Restponse
* @param {Object} callback callback Handles Reponse data/error messages
* @param {Object} next exceptionHandler Calls exceptionHandler
*/
module.exports = function (isPublic) {
    return function (req, res, next) {
        var token = req.headers.authorization;
        var responseObject;
        if (!token) {
            responseObject = Utils.errorResponse();
            responseObject.message = res.__('UNAUTHORIZED_ACCESS');
            return res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
        } else {
            jwt.verify(token, process.env.jwt_secret, function (err, tokenDetail) {
                if (err) {
                    responseObject = Utils.errorResponse();
                    responseObject.message = res.__('UNAUTHORIZED_ACCESS');
                    return res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
                } else {
                    req.me = tokenDetail;
                    next();
                }
            });
        }
    };
};