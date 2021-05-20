const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./db');
const User = require("../models/user");
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {

    User.findOne({ contactDetails:{email : username} })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.loginDetails.hash, user.loginDetails.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

