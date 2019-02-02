const redis = require('redis');

var redisClient = redis.createClient({
  host: process.env.redis || 'localhost',
  port : '6379'
})

redisClient.on('ready', () => {
  console.log('redis connected')
})

redisClient.on('error', () => {
  console.log('error connecting to redis')
})


module.exports = {redisClient}