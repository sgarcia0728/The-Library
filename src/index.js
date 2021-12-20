require('dotenv').config();
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const logger = require('@condor-labs/logger');
const bookRoutes = require('./routes/book');
const PORT = process.env.PORT || 3000;

const heatlhMonitor = require('./middlewares/healthMonitor');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

heatlhMonitor.monitor(app);

app.use('/v1', bookRoutes);

app.listen(PORT, () => {
  logger.log(`server iniciado en el puerto ${PORT}`);
});

module.exports = app;
