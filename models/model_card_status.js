'use strict';
const postgres = require('../connections/postgres')

const CardStatus  = {
  GetCardStatus : async (reqBody) => {
    console.log('# Model CardStatus.GetCardStatus')
    return new Promise(async (resolve, reject) => {
      const client = await postgres.setUpDB()
      try {
        await client.connect()
        const query = `SELECT uuid, name, type FROM public."card_status"`
        // 1 = to do  2 = in progress 3 = done 4 = store
        const _fetchData = await client.query(query)
        return resolve(_fetchData)
      } catch (err) {
        return reject(err);
      } finally {
        await client.end()
      }
    });
  }
};

module.exports = CardStatus;
