require('dotenv').config();
const logger = require('@condor-labs/logger');
const helperMongo = require('./helpers/mongoHelper');
const PORT = process.env.PORT || 3000;

helperMongo
  .connect()
  .then((res) => {
    if (res) {
      const app = require('./app');
      app.listen(PORT, () => {
        logger.log(`server iniciado en el puerto ${PORT}`);
      });
    }
    const clientMongo = helperMongo.clients;
    //console.log(clientMongo);
  })
  .catch((err) => {
    logger.log(err);
  });

process.on('message', async (msg) => {
  if (msg == 'SHUTDOWN') {
    if (helperMongo.isConnected()) {
      await helperMongo.connect.disconnect();
    }
    process.exit(0);
  }
});

/*
 .then((res) => {
    console.log(res);
    if (res) {
      app.listen(PORT, () => {
        logger.log(`server iniciado en el puerto ${PORT}`);
      });
      console.log('ggggg');
      if (helperMongo.isConnected()) {
        console.log('conectado a mongo');
      }
    }
  })
  .catch((err) => {
    logger.log(err);
  });
*/
