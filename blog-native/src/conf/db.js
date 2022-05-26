const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '28000',
    database: 'huatree_blog'
  }
  REDIS_CONF = {
    port: 63790,
    host: '127.0.0.1'
  }
}

if (env === 'prod') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '28000',
    database: 'huatree_blog'
  }
  REDIS_CONF = {
    port: 63790,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
