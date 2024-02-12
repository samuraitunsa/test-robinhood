'use strict';
const postgres = require('../connections/postgres')
const _ = require('lodash');

const CardCommentRole  = {
  InsertCardCommentRole : async (uuidCardComment, uuidUser) => {
    console.log('# Model CardCommentRole.InsertCardCommentRole')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `INSERT INTO public."card_comment_role" (card_comment_id, user_id)
                     VALUES ($1, $2)`
        const values = [uuidCardComment, uuidUser]
        const _saveCard = await client.query(query, values)
        return resolve(_saveCard)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  checkAuthorized : async (uuidCardComment, uuidUser) => {
    console.log('# Model CardCommentRole.checkAuthorized')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `SELECT uuid description FROM public."card_comment_role"
                      WHERE card_comment_id = $1
                      AND user_id = $2`
        const value = [uuidCardComment, uuidUser]
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
}

module.exports = CardCommentRole;