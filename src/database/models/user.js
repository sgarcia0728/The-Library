const mongodb = require('@condor-labs/mongodb')();
const helperMongo = require('../mongoHelper');

const userSchema = new mongodb.mongoose.Schema({
  user: String,
  password: String,
});

const dbConnection = helperMongo.clients['connection_mongo_atlas']; // I got the name of the connection from mongoDbSettings
const userModel = dbConnection.model('User', userSchema); // then I am able to create a my model based on the connection object that I got using my helper

module.exports = userModel;
