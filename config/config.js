
const config = {
  sql : {
    DB_HOST : 'localhost',
    DB_USERNAME : 'postgres',
    DB_PASSWORD : '1234',
    DB_NAME : 'robinhood',
    DB_PORT : 5433,
  },
  headerApiKey: {
    header: 'x-api-key',
    key: 'c2NiLXJvYmluaG9vZA==', // scb-robinhood (Encode to Base64 format)
  },
  headerAuth: {
    header: 'x-scb-robinhood-signature',
    secret: 'scb-robinhood-api@Ps$$',
    expiresIn: 60 * 60,
  },
  routes: {},
}

switch (process.env.NODE_ENV) {
  case 'dev': {
    break; 
  }
  case 'staging': {
    break; 
  }
  case 'pro': {
    break; 
  }
}

config.routes.api = require('./config.routes.api');
global.config = config;
module.exports = config;