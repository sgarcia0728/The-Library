'use strict';

const mongoDbSettings = [
  {
    connectionName: 'mongo',
    host: process.env.MONGODB_HOST || 'mongo',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DB_NAME || 'TheLibrary',
    user: process.env.MONGODB_USER || '',
    password: process.env.MONGODB_PASSWORD || '',
    ssl: false,
    authSource: process.env.MONGODB_AUTHSOURCE || 'admin',
    //connectionName: 'connection_mongo_atlas',
    //host: 'clustersgr-shard-00-02.usmnz.mongodb.net,clustersgr-shard-00-01.usmnz.mongodb.net,clustersgr-shard-00-00.usmnz.mongodb.net',
    //port: 27017,
    //database: 'TheLibrary',
    //user: 'sagr0728',
    //password: 'QaWsEd123',
    //seplicaSet: 'compliance-support-shard-0',
    //ssl: true,
    //authSource: 'admin',
  },
];

const mongo = require('@condor-labs/mongodb')(mongoDbSettings);

const helper = {
  clients: {}, // In clients we will save our connections that the library send us
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    // It will connect every connection on the array "mongoDbSettings"
    for (const item of mongoDbSettings) {
      const client = await mongo.getClient(item.connectionName);
      helper.clients[item.connectionName] = client;
    }
  },
};

module.exports = helper;
