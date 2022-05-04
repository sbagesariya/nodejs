
const CryptoJS = require('crypto-js');

module.exports = class Bcrypt {
    static enCryptPassword (password) {
        return new Promise((resolve) => {
            resolve(CryptoJS.AES.encrypt(password, process.env.jwt_secret));
        });
    }

    static comparePassword (password, userPassword, callback) {
        try {
            var bytes = CryptoJS.AES.decrypt(userPassword, process.env.jwt_secret);
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            password === decryptedData ? callback(null, true) : callback(null, false);
        } catch (error) {
            callback(null, false);
        }
    }
};
