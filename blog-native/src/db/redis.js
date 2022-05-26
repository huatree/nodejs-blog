const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const client = redis.createClient({
  socket: REDIS_CONF
})
client.on('error', (err) => console.log('Redis Client Error', err))
!(async function () {
  await client.connect()
})()

async function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  await client.set(key, val)
}

async function get(key) {
  const val = await client.get(key)
  return new Promise((resolve, reject) => {
    if (!val) {
      resolve(null)
      return
    }
    try {
      resolve(JSON.parse(val))
    } catch (error) {
      resolve(val)
    }
  })
}

module.exports = {
  set,
  get
}
