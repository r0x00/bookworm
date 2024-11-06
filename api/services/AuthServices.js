const passport = require('passport');

class AuthServices {
    static async login (req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        });
    };

    static async logout (req, res, next) {

    };
}


module.exports = AuthServices;