const mongodb = require('@condor-labs/mongodb')();
const helperMongo = require('../mongoHelper');
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
      enum: ['LENT', 'AVAILABLE', 'UNAVAILABLE'],
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.plugin(uniqueValidator);

module.exports.get = async (mongoHelper) => {
  await mongoHelper.connect();

  const dbConnection = helperMongo.clients['connection_mongo_atlas'];

  return dbConnection.model('Book', bookSchema);
};
