const User = require('../../methods/User');
const Passport = require('../../methods/Passport');

const verify = function(identifier, password, cb) {
    // User.findOne({ where: { username: identifier }}).then((user) => {
    //     if(!user) return cb(null, false);
  
  
    //     // check password
  
    //     console.log(user)
    //     return cb(null, user)
    // });
};


const create = function() {
    
};

module.exports = { verify, create };

