'use strict';
const postgres = require('../connections/postgres')

const Role  = {
  GetRoleUser : async (reqBody) => {
    console.log('# Model Role.GetRoleUser')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `SELECT uuid FROM public."role" WHERE type = $1`
        const value = [2] // 1 = admin  2 = user
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  }
};

module.exports = Role;
