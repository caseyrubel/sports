var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

// Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    db.User.findOne({ where: { email: user } }).success(function(user) {
        done(null, user);
    }).error(function(err) {
        done(err, null);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    function(req, username, password, done) {
        console.log(username)
        console.log(password);
        db.User.findOne({ email: username }, function(err, user) {
            console.log(user);
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

module.exports = passport;