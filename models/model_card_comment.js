'use strict';
const postgres = require('../connections/postgres')
const _ = require('lodash');

const CardComment  = {
  GetCardComment : async (uuidCard) => {
    console.log('# Model CardComment.GetCardComment')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `SELECT cm.uuid, cm.description, cm.created_at,
                        u.email, u.first_name, u.last_name,
                        ua.file_name, ua.path, ua.extension, ua.type AS user_avatar_type
                      FROM public."card_comment" AS cm
                      INNER JOIN public."user" AS u ON cm.user_id = u.uuid
                      INNER JOIN public."user_avatar" AS ua ON u.uuid = ua.user_id
                      WHERE cm.card_id = $1
                      AND cm.delete_flag = $2`
        const value = [uuidCard, 1] // delete_flag = 1 active, 0 = inactive
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  InsertCardComment : async (body, uuidUser, uuidCard) => {
    console.log('# Model CardComment.InsertCardComment')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `INSERT INTO public."card_comment" (user_id, card_id, description, created_at, updated_at)
                     VALUES ($1, $2, $3, $4, $5) RETURNING uuid`
        const values = [uuidUser, uuidCard, body.description, 'NOW()', 'NOW()']
        const _saveCard = await client.query(query, values)
        return resolve(_saveCard)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetCommentByUuid : async (uuidCardComment) => {
    console.log('# Model CardComment.GetCardComment')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `SELECT uuid, description FROM public."card_comment" WHERE uuid = $1`
        const value = [uuidCardComment]
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  DeleteCardComment : async (uuidCardComment) => {
    console.log('# Model Card.GetCardByUuid')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `UPDATE public."card_comment"
                    SET delete_flag = $1, updated_at = $2
                    WHERE uuid = $3`
        const value = [0, 'NOW()', uuidCardComment]
        const _deleteData = await client.query(query, value)
        return resolve(_deleteData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  EditCardComment : async (body, uuidCardComment) => {
    console.log('# Model Card.EditCardComment')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `UPDATE public."card_comment"
                    SET description = $1, updated_at = $2
                    WHERE uuid = $3`
        const value = [body.description, 'NOW()', uuidCardComment]
        const _deleteData = await client.query(query, value)
        return resolve(_deleteData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
}

module.exports = CardComment;