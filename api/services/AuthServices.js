const passport = require('./passport');


class AuthServices {
    static async login (req, res, next) {
        const { identifier, password } = req.body;

        if(!identifier) return res.status(400).send("Please add identifier");
        if(!password) return res.status(400).send("Please add password");

        passport.login(req, res,next);
    };

    static async logout (req, res, next) {
        req.logout(function(_error) {
            if (_error) return next(_error);

            res.redirect('/');
        });
    };
};


module.exports = AuthServices;