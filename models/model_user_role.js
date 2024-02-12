'use strict';
const postgres = require('../connections/postgres')

const UserRole  = {
  InsertUserRole : async (uuidUser, uuidRole) => {
    console.log('# Model User.InsertUserRole')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `INSERT INTO public."user_role"(user_id, role_id)
                    VALUES ($1, $2)`
        const values = [uuidUser, uuidRole]
        const _saveUserRole = await client.query(query, values)
        return resolve(_saveUserRole)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  }
};

module.exports = UserRole;
