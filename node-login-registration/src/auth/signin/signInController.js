
const SignInService = require('./signInService');
const Utils = require( '../../util/utilFunctions');

/**
 * Class represents controller for signin.
 */
class SignInController {
    /**
     * @desc This function is being used to sign-in user
     * @author Shivram
     * @since 01/03/2020.
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {Object} res Restponse
     * @param {Object} callback callback Handles Reponse data/error messages
     * @param {Object} next exceptionHandler Calls exceptionHandler
     */
    login (req, res, next) {
        new SignInService().signIn(req, res, (error, data) => {
            Utils.sendResponse(error, data, res, 'SIGNIN_SUCCESS');
        }, next);
    }
    
     /**
     * @desc This function is being used to get user list
     * @author Shivram
     * @since 01/03/2020
     * @param {Object} req.me Request object
     * @param {Object} req.me.email Requesting user email
     * @param {Object} req.me.email Requesting user type
     * @param {Object} callback callback Handles Reponse data/error messages
     * @param {Object} next exceptionHandler Calls exceptionHandler
     */
    getUserList (req, res, next) {
        new SignInService().getUserList(req, res, (error, data) => {
            Utils.sendResponse(error, data, res, 'USER_GET_SUCCESS');
        }, next);
    }

}

module.exports = SignInController;
