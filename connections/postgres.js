const { Client } = require('pg')

async function setUpDB () {
  const client = await new Client({
    host: global.config.sql.DB_HOST,
    user: global.config.sql.DB_USERNAME,
    password: global.config.sql.DB_PASSWORD,
    database: global.config.sql.DB_NAME,
    port: global.config.sql.DB_PORT
  })
  return client
}



module.exports = {
  setUpDB
}