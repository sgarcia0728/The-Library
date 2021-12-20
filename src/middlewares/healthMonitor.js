const { healthMonitor, dependencyServices } = require('@condor-labs/health-middleware');

const healthConfig = {
  service: 'service random',
  description: 'my service health',
  dependencies: [
    {
      service: dependencyServices.REDIS,
      componentName: 'MyRedis',
      connection: {
        prefix: 'the-library-sg',
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
      },
    },
    {
      service: dependencyServices.MONGODB,
      componentName: 'MyMongoDB',
      connection: {
        host: process.env.MONGODB_HOST || 'mongo',
        port: process.env.MONGODB_PORT || 27017,
        database: process.env.MONGODB_DB_NAME || 'TheLibrary',
        user: process.env.MONGODB_USER || '',
        password: process.env.MONGODB_PASSWORD || '',
        ssl: false,
        authSource: process.env.MONGODB_AUTHSOURCE || 'admin',
      },
    },
  ],
  checks: [],
  urls: [],
};

module.exports.monitor = (app) => {
  healthMonitor(app, healthConfig);
};
