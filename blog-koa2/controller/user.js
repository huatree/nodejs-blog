const { exec, escape } = require('../db/mysql')
const { getPassword } = require('../utils/cryp')

const signIn = async (username, password) => {
  username = escape(username)
  password = getPassword(password)
  password = escape(password)
  const sql = `select username, realname from users where username=${username} and password=${password}`
  const rows = await exec(sql)
  return rows[0] || {}
}

module.exports = {
  signIn
}
