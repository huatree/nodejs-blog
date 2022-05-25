const redis = require('redis')

;(async () => {
  const client = redis.createClient({
    socket: {
      port: 63790,
      host: '127.0.0.1'
    }
  })

  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()
  await client.set('myname', 'zhangsan2')
  const value = await client.get('myname')
  console.log(value)
  await client.quit()
})()
