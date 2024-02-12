'use strict';
const postgres = require('../connections/postgres')
const _ = require('lodash');
const utils = require('../libs/utils');

const User  = {
  InsertUser : async (body) => {
    console.log('# Model User.InsertUser')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const hashPassword = utils.hashPassword(body.password)
        const query = `INSERT INTO public."user" (user_name, email, password, first_name, last_name, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING uuid`
        const values = [body.user_name, body.email, hashPassword, body.first_name, body.last_name, 'NOW()', 'NOW()']
        const _saveUser = await client.query(query, values)
        return resolve(_saveUser)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetUserByEmail : async (email) => {
    console.log('# Model User.GetUserByEmail')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `SELECT email FROM public."user" WHERE email = $1`
        const value = [email]
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetUserByUuid : async (uuid) => {
    console.log('# Model User.GetUserByUuid')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `SELECT uuid, user_name, email, first_name, last_name FROM public."user" WHERE uuid = $1`
        const value = [uuid]
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetUserLogin : async (body) => {
    console.log('# Model User.GetUserLogin')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const hashPassword = utils.hashPassword(body.password)
        const query = `SELECT u.uuid, u.user_name, u.email, u.first_name, u.last_name,
                        r.name AS role_name,
                        ua.file_name, ua.path, ua.extension, ua.type AS user_avatar_type
                    FROM public."user" AS u
                    INNER JOIN public."user_role" AS ur ON u.uuid = ur.user_id
                    INNER JOIN public."role" r ON r.uuid = ur.role_id
                    INNER JOIN public."user_avatar" AS ua ON u.uuid = ua.user_id
                    WHERE (user_name = $1 OR email = $1)
                    AND password = $2` 
        const value = [body.user_name, hashPassword]
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
};

module.exports = User;
