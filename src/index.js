require('dotenv').config();
const logger = require('@condor-labs/logger');
const helperMongo = require('./helpers/mongoHelper');
const PORT = process.env.PORT || 3000;
const app = require('./app');

app.listen(PORT, () => {
  logger.log(`server iniciado en el puerto ${PORT}`);
});

/*
helperMongo
  .connect()
  .then((res) => {
    if (res) {
      const app = require('./app');
      app.listen(PORT, () => {
        logger.log(`server iniciado en el puerto ${PORT}`);
      });
    }
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
});*/
