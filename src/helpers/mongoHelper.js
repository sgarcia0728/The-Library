'use strict';

const mongoDbSettings = [
  {
    connectionName: process.env.MONGODB_CONNECTION_NAME,
    host: process.env.MONGODB_HOST || 'mongo',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DB_NAME || 'TheLibrary',
    user: process.env.MONGODB_USER || '',
    password: process.env.MONGODB_PASSWORD || '',
    ssl: process.env.MONGODB_SSL || false,
    replicaSet: process.env.MONGODB_REPLICASET,
    authSource: process.env.MONGODB_AUTHSOURCE || 'admin',
    //connectionName: 'connection_mongo_atlas',
    //host: 'clustersgr-shard-00-02.usmnz.mongodb.net,clustersgr-shard-00-01.usmnz.mongodb.net,clustersgr-shard-00-00.usmnz.mongodb.net',
    //port: 27017,
    //database: 'TheLibrary',
    //user: 'sagr0728',
    //password: 'QaWsEd123',
    //seplicaSet: 'compliance-support-shard-0',
    //ssl: true,
    //authSource: 'admin',//
  },
];

const mongo = require('@condor-labs/mongodb')(mongoDbSettings);

const helper = {
  clients: {},
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    const client = await mongo.getClient(mongoDbSettings[0].connectionName);
    helper.clients[mongoDbSettings[0].connectionName] = client;
    return client;
  },
};

module.exports = helper;
