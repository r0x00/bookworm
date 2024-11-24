const passport = require('./passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class AuthServices {
    static async login (req, res, next) {
        const { identifier, password } = req.body;

        if(!identifier) return res.status(400).send("Please add identifier");
        if(!password) return res.status(400).send("Please add password");


        // passport.authenticate('local', { session: false }, function(_error, user) {
        //     if(!user || _error) return res.status(400).send("Username or password is wrong");

        //     res.send(user);

        // })(req, res, next);

        passport.authenticate('local', { session: false }, function(_error, user) {
            if(!user || _error) return res.status(400).send("Username or password is wrong");

            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                permission: user.permission
            };
          
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
          
            res.status(200).send({ token });

        })(req, res, next);
    }; 

    static async logout (req, res, next) {
        req.logout(function(_error) {
            if (_error) return next(_error);

            res.redirect('/');
        });
    };
};


module.exports = AuthServices;