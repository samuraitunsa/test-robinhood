'use strict';
const postgres = require('../connections/postgres')

const UserAvatar  = {
  InsertUserAvatarDefault : async (uuidUser) => {
    console.log('# Model User.InsertUserAvatarDefault')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const path = ''
        const query = `INSERT INTO public."user_avatar"(user_id, original_name, file_name, mimetype, path, extension)
                    VALUES ($1, $2, $3, $4, $5, $6)`
        const values = [uuidUser, 'default_avatar', 'default_avatar', 'image/jpeg', '/', 'jpg']
        const _saveUserAvatarDefault = await client.query(query, values)
        return resolve(_saveUserAvatarDefault)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  }
};

module.exports = UserAvatar;
