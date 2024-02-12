'use strict';
const jwt = require('jsonwebtoken')
const { ErrorNotFound, ErrorUnauthorized } = require('../../libs/error_methods');


const User  = {  
  SetCreateUser : async (body) => {
    console.log('# Service User.SetCreateUser');
    return new Promise(async (resolve, reject) => {
      try {
        const _saveUser = await global.Model.User.InsertUser(body)
        if (_saveUser.rowCount > 0) {
          const _fetchDataUserRole = await global.Model.Role.GetRoleUser()
          if (_fetchDataUserRole.rowCount > 0) {
            await Promise.all([
              await global.Model.UserRole.InsertUserRole(_saveUser.rows[0].uuid, _fetchDataUserRole.rows[0].uuid),
              await global.Model.UserAvatar.InsertUserAvatarDefault(_saveUser.rows[0].uuid)
            ])
          }
          return resolve(_saveUser)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetLogin : async (req) => {
    console.log('# Service User.SetLogin');
    return new Promise(async (resolve, reject) => {
      try {
        const body = req.body
        const _fetchDataUser = await global.Model.User.GetUserLogin(body)
        if (_fetchDataUser.rowCount === 0) {
          return reject(ErrorNotFound(`ไม่มีผู้ใช้งานหรือรหัสผ่านผิด`));
        }
        const _fetchDataUserRow = _fetchDataUser.rows[0]
        const objToken = {
          uuid : _fetchDataUserRow.uuid,
          user_name: _fetchDataUserRow.user_name,
          role_name: _fetchDataUserRow.role_name
        }
        const token = jwt.sign(objToken, global.config.headerAuth.secret, { expiresIn: global.config.headerAuth.expiresIn })
        let _fetchUserProfile = global.Helper.Web.V1.User._map_user_data(_fetchDataUserRow, req)
        _fetchUserProfile.token = token
        return resolve(_fetchUserProfile)
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetAuthenticated: async (user, token) => {
    console.log('# Service User.SetAuthenticated');
    return new Promise(async (resolve, reject) => {
      try {
        if (!user) return reject(ErrorUnauthorized(`Authenticated Fail!!`));
        if (!user.uuid) return reject(ErrorUnauthorized(`Authenticated Fail!!`));
        if (!token) return reject(ErrorUnauthorized(`Authenticated Fail!!`));
        const _fetchUser = await global.Model.User.GetUserByUuid(user.uuid);
        if (_fetchUser.rowCount === 0) return reject(ErrorUnauthorized(`Authenticated Fail!!`));
        const objUserById = _fetchUser.rows[0]
        return resolve(objUserById);
      } catch (err) {
        return reject(err);
      }
    });
  },
};

module.exports = User;
