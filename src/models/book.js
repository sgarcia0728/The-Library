const mongodb = require('@condor-labs/mongodb')();
const helperMongo = require('../helpers/mongoHelper');
const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new mongodb.mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.plugin(uniqueValidator);

const get = async () => {
  await helperMongo.connect();
  const dbConnection = helperMongo.clients[process.env.MONGODB_CONNECTION_NAME];
  return dbConnection.model('Book', bookSchema);
};

module.exports = { get };
/*
const dbConnection = helperMongo.clients[process.env.MONGODB_CONNECTION_NAME];
const bookModel = dbConnection.model('Book', bookSchema); //mongodb.mongoose.model('Book', bookSchema);
module.exports = bookModel;*/
