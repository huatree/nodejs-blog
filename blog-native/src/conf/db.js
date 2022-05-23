const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '28000',
    database: 'huatree_blog'
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
}

module.exports = {
  MYSQL_CONF
}
