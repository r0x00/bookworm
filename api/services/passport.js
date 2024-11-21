const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const strategy = require('./strategy')


passport.login = function (req, res, next) {
  // passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login'
  // })(req, res, next);

  passport.authenticate('local', { session: false }, function(req, res) {
    // res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
  })(req, res, next);
};

passport.use(new LocalStrategy(strategy.local.verify, strategy.local.create));

passport.use(new BearerStrategy(strategy.bearer.verify, strategy.bearer.create));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;