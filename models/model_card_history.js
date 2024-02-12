'use strict';
const postgres = require('../connections/postgres')

const CardHistory  = {
  InsertCardHistory : async (body, uuidCard, uuidCardStatus, uuidUser) => {
    console.log('# Model CardHistory.InsertCardHistory')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `INSERT INTO public."card_history"(card_id, card_status_id, title, description, user_id)
                    VALUES ($1, $2, $3, $4, $5)`
        const values = [uuidCard, uuidCardStatus, body.title, body.description, uuidUser]
        const _saveCardHistory = await client.query(query, values)
        return resolve(_saveCardHistory)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
  GetCardHistory : async (uuidCard) => {
    console.log('# Model CardHistory.GetCardHistory')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        
        const query = `SELECT ch.uuid, ch.title, ch.description,
                        cs.uuid, cs.name, cs.type
                      FROM public."card_history" AS ch
                      INNER JOIN public."card_status" AS cs ON ch.card_status_id = cs.uuid
                      WHERE ch.card_id = $1`
        
        const value = [uuidCard]
        const _fetchData = await client.query(query, value)
        console.log("_fetchData", _fetchData)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  },
};

module.exports = CardHistory;
