const express = require('express');
const app = express();
const book = require('./routes/book');
require('./database/server');

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(book);

app.listen(PORT, HOST, () => {
  //console.log(`server iniciado en el puerto ${PORT}`);
});

module.exports = app;
