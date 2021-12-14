'use strict';

const mongoDbSettings = [
  {
    connectionName: 'connection_mongo_atlas',
    host: 'clustersgr-shard-00-02.usmnz.mongodb.net,clustersgr-shard-00-01.usmnz.mongodb.net,clustersgr-shard-00-00.usmnz.mongodb.net',
    port: 27017,
    database: 'TheLibrary',
    user: 'sagr0728',
    password: 'QaWsEd123',
    replicaSet: 'compliance-support-shard-0',
    ssl: true,
    authSource: 'admin',
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
      let client = await mongo.getClient(item.connectionName);
      helper.clients[item.connectionName] = client;
    }
  },
};

module.exports = helper;
