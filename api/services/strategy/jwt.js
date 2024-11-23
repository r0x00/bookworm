const User = require("../../methods/User");

const verify = function(jwtPayload, cb) {
    const { email, username } = jwtPayload;

    User.findOne({ where: { email, username }}).then((user) => {
        if(!user) return cb(null, false);

        cb(null, user);
    })
};


module.exports = { verify };

