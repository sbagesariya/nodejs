const Bcrypt = require('../../util/bcrypt');
const JWT = require('../../util/jwt');
const User = require('../user.model');

/**
 * Class represents services for signin.
 */
class SignInService {

    /**
     * @desc This function is being used to sign in user
     * @author Shivram
     * @since 01/03/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {Object} res Restponse
     * @param {Object} callback callback Handles Reponse data/error messages
     * @param {Object} next exceptionHandler Calls exceptionHandler
     */
    signIn (req, res, callback, next) {
        req.body.email = req.body.email.toLowerCase();
        try {
            User.find({'email': req.body.email}, function (err, result) {
                if (err) return next (err);
                if (!result.length) {
                    callback('LOGIN_FAIL');
                } else {
                    result = JSON.parse(JSON.stringify(result));
                    Bcrypt.comparePassword(req.body.password, result[0].password, function (error, isMatch) {
                        if (error) {
                            logger.error('Sign in:-userLogin', error);
                            return next(error);
                        }
                        if (!isMatch) {
                            return callback(res.__('LOGIN_FAIL'));
                        }
                        var token = JWT.generate({
                            id: result[0]._id,
                            email: result[0].email,
                            userType: result[0].userType
                        });
                        result[0].token = token;
                        callback(null,result[0])
                    });
                }
            });
        } catch (err) {
            return next(err);
        }
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
    getUserList (req, res, callback, next) {
        var query = {};
        if (req.me.userType === 'Editor') {
            query = {
                email: req.me.email
            };
        }
        User.find(query, function (err, result) {
            if (err) return next (err);
            console.log(result);
            callback(null, result);
        });
    }


}

module.exports = SignInService;
