var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var bcrypt = require('bcrypt');

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
        db.User.findOne({ where: { email: username } }).then(
            function(results) {
                console.log(results.password);
                if (!results) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                console.log('yes')
                bcrypt.compare(password, results.password, function(err, isMatch) {
                    if (err) console.log(err)
                    if (isMatch) {
                        console.log('sign')
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                    return done(null, user);
                });
            })
    }));

module.exports = passport;