const settings = {
  host: process.env.REDIS_HOST || 'redis',
  prefix: 'the-library-sg',
  port: 6379,
};

const keyName = 'personalproject-sg';

const redisClient = async () => {
  const redis = require('@condor-labs/redis')(settings);
  const client = await redis.getClient();
  return client.batch();
};

const redisGet = async (key) => {
  const batch = await redisClient();
  await batch.get(keyName + key);
  const res = await batch.execAsync();

  if (res[0]) {
    return JSON.parse(res[0]);
  }

  return false;
};

const redisSet = async (key, value) => {
  const batch = await redisClient();
  await batch.set(keyName + key, value);
  return await batch.execAsync();
};

const redisDel = async (key) => {
  const batch = await redisClient();
  await batch.del(keyName + key);
  return await batch.execAsync();
};

module.exports = {
  redisGet,
  redisSet,
  redisDel,
};
