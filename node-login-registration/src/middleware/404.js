/**
 * Created by Shivram on 01/03/2020
 * @name 404 Handler
 */

const HTTPStatus = require('../util/http-status');

module.exports = function (req, res) {
    res.status(HTTPStatus.NOT_FOUND).send({
        status: 0,
        data: {},
        error: '',
        message: res.__('NOT_FOUND')
    });
};
