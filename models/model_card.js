'use strict';
const postgres = require('../connections/postgres')
const _ = require('lodash');

const Card  = {
  InsertCard : async (body, userUuid, cardStatusToDoUuid) => {
    console.log('# Model Card.InsertCard')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `INSERT INTO public."card" (user_id, card_status_id, title, description, created_at, updated_at)
                     VALUES ($1, $2, $3, $4, $5, $6) RETURNING uuid`
        const values = [userUuid, cardStatusToDoUuid, body.title, body.description, 'NOW()', 'NOW()']
        const _saveCard = await client.query(query, values)
        return resolve(_saveCard)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetCardByUuid : async (uuid) => {
    console.log('# Model Card.GetCardByUuid')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `SELECT uuid, user_id, card_status_id, title, description FROM public."card" WHERE uuid = $1`
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
  UpdateCard : async (body, uuidCard) => {
    console.log('# Model Card.GetCardByUuid')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `UPDATE public."card"
                    SET title = $1, description = $2, card_status_id = $3, updated_at = $4
                    WHERE uuid = $5`
        const value = [body.title, body.description, body.card_status_id, 'NOW()', uuidCard]
        const _updateData = await client.query(query, value)
        return resolve(_updateData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetCard : async () => {
    console.log('# Model Card.GetCard')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `SELECT c.uuid, c.title, c.description, c.created_at,
                        u.email, u.first_name, u.last_name,
                        cs.uuid, cs.name, cs.type,
                        ua.file_name, ua.path, ua.extension, ua.type AS user_avatar_type
                      FROM public."card" AS c
                      INNER JOIN public."card_status" AS cs ON c.card_status_id = cs.uuid
                      INNER JOIN public."user" AS u ON c.user_id = u.uuid
                      INNER JOIN public."user_avatar" AS ua ON u.uuid = ua.user_id
                      WHERE cs.type <> $1`
        const value = [4]
        const _fetchData = await client.query(query, value)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  UpdateCardStore : async (uuidCard, uuidCardStatusStore) => {
    console.log('# Model Card.UpdateCardStore')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `UPDATE public."card"
                    SET card_status_id = $1, updated_at = $2
                    WHERE uuid = $3`
        const value = [uuidCardStatusStore, 'NOW()', uuidCard]
        const _updateData = await client.query(query, value)
        return resolve(_updateData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  InsertCardComment : async (body, uuidUser, uuidCard) => {
    console.log('# Model Card.InsertCardComment')
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
}

module.exports = Card;