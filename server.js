require('dotenv').config();
require('./config/config');


async function ServerExpress() {

  const Express = require('express');
  const App = Express();
  const Server = require('./config/express');
  await Server.Config(App, Express);
  const port = process.env.PORT
  // Load Models to global
  setTimeout(async () => {
    await Server.LoadGlobal('Model', __dirname + '/models', 'model_');
  }, (Math.floor(Math.random() * 5 + 1)) * 100);
  // Load Service to global
  setTimeout(async () => {
    await Server.LoadGlobal('Service', __dirname + '/services', 'service_');
  }, (Math.floor(Math.random() * 5 + 1)) * 100);
  // Load Helper to global
  setTimeout(async () => {
    await Server.LoadGlobal('Helper', __dirname + '/helpers', 'helper_');
  }, (Math.floor(Math.random() * 5 + 1)) * 100);
  
  App.get('/', async (req, res) => {
    return res.json({
      APP_NAME: "test",
      APP_VERSION: "1.0.0",
    });
  });
  
  App.use('/api/v1', require('./routes/route_api_v1'));

  App.get('/error', (req, res, next) => {
    next(new Error('A contrived error'));
  });

  App.use(Server.Error);
  App.use(Server.NotFound);

  App.listen(port, () => console.log(`App listening on port ${port}!`))
  
}


module.exports = ServerExpress();