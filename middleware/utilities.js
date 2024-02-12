'use strict';

const passport = require('passport');
const { ErrorUnauthorized, ErrorForbidden } = require('../libs/error_methods');

exports.CheckApiKey = async (req, res, next) => {
  // console.log('## Middleware CheckApiKey', req.headers[global.config.headerApiKey.header]);
  if (req.headers.hasOwnProperty(global.config.headerApiKey.header) && (req.headers[global.config.headerApiKey.header] === global.config.headerApiKey.key)) {
    return next();
  }
  return res.success({}, 401, `Unauthorized`, 401);
};

exports.AuthenticatedApi = async (req, res, next) => {
  // console.info('## Middleware AuthenticatedApi');
  passport.authenticate('jwt', { session: false }, async (error, user, info, status) => {
    try {
      if (user === false || (info && info.message === 'No auth token')) {
        console.info('## Middleware AuthenticatedApi: No auth token');
        delete req.user;
        return res.error(ErrorUnauthorized(`Authenticated Fail!!`));
      } else {
        req.user = await global.Service.User.User.SetAuthenticated(user, req.headers[global.config.headerAuth.header]);
        return next();
      }
    } catch (err) {
      return res.error(err);
    }
  })(req, res, next);
};

