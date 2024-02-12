'use strict';
const { validationResult } = require('express-validator');
const _ = require('lodash');

module.exports = (req, res, next) => {
  const validate = validationResult(req);
  if (validate.isEmpty()) {
    return next();
  }
  // let extractErrors = [];
  // validate.array().map((err) =>   extractErrors.push({ [err.param]: err.msg }));
  // console.log(extractErrors)
  let validates = validate.array();
  let invalid = _.uniq(validates.map(v => v.param));
  return res.success({}, 2, `Invalid ${invalid}`, 400, validates);
};
