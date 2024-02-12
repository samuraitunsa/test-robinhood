'use strict';
const _ = require('lodash');


const ApiV1User = {
  CreatePost: async (req, res, next) => {
    console.log('# Controller ApiV1User.CreatePost');
    try {
      const reqBody = req.body
      const resRegister = await global.Service.User.User.SetCreateUser(reqBody)
      return res.success({}, 201, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1User.CreatePost', err);
      return res.error(err);
    }
  },
  LoginPost: async (req, res, next) => {
    console.log('# Controller ApiV1User.LoginPost');
    try {
      const user = await global.Service.User.User.SetLogin(req);
      return res.success(user, 0, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1Login.LoginPost:', err);
      return res.error(err);
    }
  },
};

module.exports = ApiV1User;
