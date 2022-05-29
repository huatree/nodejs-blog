const { createClient } = require('redis')
const { REDIS_CONF } = require('../conf/db')

let redisClient = createClient({ legacyMode: true, socket: REDIS_CONF })
redisClient.connect().catch(console.error)

module.exports = { redisClient }
