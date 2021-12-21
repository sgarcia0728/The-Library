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

module.exports.get = async (mongoHelper) => {
  await mongoHelper.connect();
  const dbConnection = helperMongo.clients['mongo'];
  return dbConnection.model('Book', bookSchema);
};
