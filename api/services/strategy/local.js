const User = require('../../methods/User');
const Passport = require('../../methods/Passport');

const verify = function(identifier, password, cb) {
    User.findOne({ where: { username: identifier }}).then((user) => {
        if(!user) return cb(null, false);

        Passport.findOne({ where: { id: user.id }}).then((passport) => {
            if(!passport) return cb(null, false);

            if(!passport.verifyPassword(password)) return (null, false);

            return cb(null, user)
        });
    });
};


const create = function() {
    
};

module.exports = { verify, create };

