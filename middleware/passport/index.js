'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader(global.config.headerAuth.header);
opts.secretOrKey = global.config.headerAuth.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  if (jwt_payload.hasOwnProperty('uuid')) {
    return done(null, jwt_payload);
  } else {
    return done(null, false);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.passport = passport;