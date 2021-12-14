const mongoDbHelper = require('./mongoHelper');

mongoDbHelper.connect().then(async () => {
  // Load helpers
  const userModel = require('./models/user');
  userModel.findOne({});
});
