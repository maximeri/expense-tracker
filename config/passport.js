const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = passportConfig => {
  passportConfig.use(passport.initialize());
  passportConfig.use(passport.session());

  passport.use(new LocalStrategy(
    function (email, password, done) {
      User.findOne({ email }, function (err, user) {
        if (err) { 
          console.log('cannot connect to db')
          return done(err); 
        }
        if (!user) { 
          console.log('cannot find the user')
          return done(null, false); 
        }
        if (!user.password) { 
          console.log('wrong password')
          return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}