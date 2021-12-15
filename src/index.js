const express = require('express');
const app = express();
const createError = require('http-errors');
const { healthMonitor } = require('@condor-labs/health-middleware');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const bookRoutes = require('./routes/book');
const { PORT = 3000 } = process.env;

healthMonitor(app);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`server iniciado en el puerto ${PORT}`);
});

module.exports = app;
