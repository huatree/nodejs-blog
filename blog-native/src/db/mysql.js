const mysql = require('mysql2')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (error, result) => {
      if (error) throw error
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec
}
