const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'Cykh567_e@#v!0'

/**
 * md5加密
 * @param {string} content
 * @returns
 */
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密函数
 * @param {string} password
 * @returns
 */
function getPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = { getPassword }
