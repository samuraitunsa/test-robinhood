'use strict';
const { body, query, param, check } = require('express-validator');

const rules = {
  user_name: body('user_name')
    .notEmpty().withMessage('User name not empty').bail()
    .isString().withMessage('User name must be string').bail(),
  email: body('email')
    .optional()
    .isEmail().withMessage('Email Invalid value').bail()
    .custom(async (value, { req }) => {
      if (value == null) {
        return Promise.reject('Invalid Email');
      }
      try {
        const _fetchData = await global.Model.User.GetUserByEmail(value)
        if (_fetchData.rowCount !== 0) {
          return Promise.reject('Email already exists');
        }
        req._fetchData = _fetchData.rows[0];
        return Promise.resolve();
      } catch (e) {
        return Promise.reject('Email already exists');
      }
    }).bail(),
  password: body('user_name')
    .notEmpty().withMessage('Password not empty').bail()
    .isString().withMessage('Password must be string').bail(),
  first_name: body('first_name')
    .notEmpty().withMessage('First name not empty').bail()
    .isString().withMessage('First name must be string').bail(),
  last_name: body('last_name')
    .notEmpty().withMessage('Last name not empty').bail()
    .isString().withMessage('Last name must be string').bail()
};

module.exports = {
  checkRegister: [rules.user_name, rules.password, rules.first_name, rules.last_name, rules.email],
  checkLogin: [rules.user_name, rules.password]
};
