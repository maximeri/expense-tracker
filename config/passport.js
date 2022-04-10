const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = passportConfig => {
  passportConfig.use(passport.initialize());
  passportConfig.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email' },
    function (email,password, done) {
      User.findOne({ email }, function (err, user) {
        if (err) { 
          console.log('cannot connect to db')
          return done(err); 
        }
        if (!user) { 
          console.log('cannot find the user')
          return done(null, false); 
        }
        if (!bcrypt.compare(password, user.password)) { 
          console.log('wrong password')
          return done(null, false); 
        }
        return done(null, user);
      });
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
  }))


  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}